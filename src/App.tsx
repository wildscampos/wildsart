import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

type Role = "cliente" | "lojista" | "motoboy" | "admin";
type ApprovalStatus = "aguardando_aprovacao" | "aprovado" | "recusado" | "bloqueado" | "suspenso";
type MotoboyStatus = "offline" | "online" | "em_entrega" | "indisponivel";
type OrderStatus = "criado" | "procurando_motoboy" | "aceito" | "indo_coleta" | "coletado" | "indo_entrega" | "entregue" | "cancelado";

type User = { id: string; name: string; email: string; password: string; role: Role; approvalStatus: ApprovalStatus; motoboyStatus?: MotoboyStatus };
type Store = { id: string; name: string; ownerUserId: string; city: string; approvalStatus: ApprovalStatus; active: boolean };
type Product = { id: string; storeId: string; name: string; priceCents: number; active: boolean };
type Wallet = { userId: string; balanceCents: number };
type Order = { id: string; clientId: string; storeId: string; motoboyId?: string; status: OrderStatus; address: string; items: { productId: string; qty: number }[]; baseDeliveryCents: number; storeFeeCents: number; motoboyDiscountCents: number; platformRevenueCents: number; storePaysCents: number; motoboyReceivesCents: number; createdAt: string };
type Log = { id: string; type: string; message: string; orderId?: string; createdAt: string };

const C = { bg: "#0B0B0B", card: "#1C1C1E", text: "#FFFFFF", sub: "#8E8E93", primary: "#FF6A00" };
const BASE_DELIVERY_CENTS = 1000;
const STORE_FEE_CENTS = 75;
const MOTOBOY_DISCOUNT_CENTS = 75;
const PLATFORM_REVENUE_CENTS = 150;

const formatBRL = (cents: number) => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const ls = <T,>(key: string, fallback: T): T => JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(localStorage.getItem("mc_user"));

  useEffect(() => {
    setUsers(ls("mc_users", [
      { id: "u-cliente", name: "Cliente Demo", email: "cliente@meucorre.com", password: "123456", role: "cliente", approvalStatus: "aprovado" },
      { id: "u-lojista", name: "Lojista Demo", email: "lojista@meucorre.com", password: "123456", role: "lojista", approvalStatus: "aprovado" },
      { id: "u-motoboy", name: "Carlos Entregas", email: "motoboy@meucorre.com", password: "123456", role: "motoboy", approvalStatus: "aprovado", motoboyStatus: "online" },
      { id: "u-admin", name: "Admin", email: "admin@meucorre.com", password: "123456", role: "admin", approvalStatus: "aprovado" },
    ]));
    setStores(ls("mc_stores", [
      { id: "s1", name: "Açaí do Centro", ownerUserId: "u-lojista", city: "Lorena-SP", approvalStatus: "aprovado", active: true },
      { id: "s2", name: "Hamburgueria Lorena", ownerUserId: "u-lojista", city: "Lorena-SP", approvalStatus: "aprovado", active: true },
    ]));
    setProducts(ls("mc_products", [
      { id: "p1", storeId: "s1", name: "Açaí 500ml", priceCents: 1800, active: true },
      { id: "p2", storeId: "s2", name: "Combo X-Burger", priceCents: 2900, active: true },
      { id: "p3", storeId: "s2", name: "Refrigerante", priceCents: 800, active: true },
    ]));
    setOrders(ls("mc_orders", []));
    setWallets(ls("mc_wallets", [{ userId: "u-motoboy", balanceCents: 0 }]));
    setLogs(ls("mc_logs", []));
  }, []);

  useEffect(() => localStorage.setItem("mc_users", JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem("mc_stores", JSON.stringify(stores)), [stores]);
  useEffect(() => localStorage.setItem("mc_products", JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem("mc_orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("mc_wallets", JSON.stringify(wallets)), [wallets]);
  useEffect(() => localStorage.setItem("mc_logs", JSON.stringify(logs)), [logs]);

  const currentUser = users.find((u) => u.id === currentUserId) || null;
  const addLog = (type: string, message: string, orderId?: string) => setLogs((prev) => [{ id: crypto.randomUUID(), type, message, orderId, createdAt: new Date().toISOString() }, ...prev]);

  const canAccess = (u: User | null) => u && u.approvalStatus === "aprovado";
  const shell = (title: string, child: React.ReactNode) => <div style={{ background: C.bg, color: C.text }} className="min-h-screen p-4"><div className="max-w-6xl mx-auto space-y-4"><header className="rounded-2xl p-4" style={{ background: C.card }}><div className="flex justify-between items-center"><div><h1 className="text-2xl font-bold">Meu Corre $</h1><p style={{ color: C.sub }}>Aqui o seu corre vale mais!</p></div><div className="flex gap-2">{currentUser && <Badge style={{ background: C.primary }}>{currentUser.role}</Badge>}{currentUser && <Button onClick={() => { localStorage.removeItem("mc_user"); setCurrentUserId(null); }}>Sair</Button>}</div></div></header><h2 className="text-xl font-semibold">{title}</h2>{child}</div><Toaster /></div>;

  const Login = () => { const [email, setEmail] = useState("cliente@meucorre.com"); const [password, setPassword] = useState("123456"); return shell("Login", <Card style={{ background: C.card, borderRadius: 20 }}><CardContent className="p-4 space-y-3"><Input value={email} onChange={(e) => setEmail(e.target.value)} /><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><Button className="w-full" style={{ background: C.primary }} onClick={() => { const u = users.find((x) => x.email === email && x.password === password); if (!u) return toast({ title: "Credenciais inválidas" }); localStorage.setItem("mc_user", u.id); setCurrentUserId(u.id); }}>{"Entrar"}</Button><Link to="/cadastro" className="underline">Criar conta</Link></CardContent></Card>); };

  const Cadastro = () => { const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("123456"); const [role, setRole] = useState<Role>("cliente"); return shell("Cadastro", <Card style={{ background: C.card, borderRadius: 20 }}><CardContent className="p-4 space-y-3"><Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} /><Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><Input placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} /><Select value={role} onValueChange={(v) => setRole(v as Role)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["cliente", "lojista", "motoboy", "admin"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><Button className="w-full" style={{ background: C.primary }} onClick={() => { setUsers((prev) => [...prev, { id: crypto.randomUUID(), name, email, password, role, approvalStatus: "aguardando_aprovacao", motoboyStatus: role === "motoboy" ? "offline" : undefined }]); toast({ title: "Cadastro enviado para aprovação" }); }}>{"Cadastrar"}</Button></CardContent></Card>); };

  const Cliente = () => { const [storeId, setStoreId] = useState(stores[0]?.id || ""); const [address, setAddress] = useState("Rua Principal, 100 - Lorena"); const [cart, setCart] = useState<Record<string, number>>({}); const storeProducts = products.filter((p) => p.storeId === storeId && p.active); const my = orders.filter((o) => o.clientId === currentUser?.id); const itemsSubtotal = Object.entries(cart).reduce((t, [pid, q]) => t + (products.find((p) => p.id === pid)?.priceCents || 0) * q, 0); const total = itemsSubtotal + BASE_DELIVERY_CENTS + STORE_FEE_CENTS;
    return shell("Home Cliente", <div className="grid md:grid-cols-2 gap-4"><Card style={{ background: C.card, borderRadius: 20 }}><CardHeader><CardTitle>Novo Pedido</CardTitle></CardHeader><CardContent className="space-y-2"><Select value={storeId} onValueChange={setStoreId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{stores.filter((s) => s.active && s.approvalStatus === "aprovado").map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select>{storeProducts.map((p) => <div key={p.id} className="flex justify-between gap-2"><span>{p.name} ({formatBRL(p.priceCents)})</span><Input type="number" min={0} value={cart[p.id] || 0} onChange={(e) => setCart((prev) => ({ ...prev, [p.id]: Number(e.target.value) }))} className="w-20" /></div>)}<Input value={address} onChange={(e) => setAddress(e.target.value)} /><p style={{ color: C.sub }}>Total com taxa: {formatBRL(total)}</p><Button style={{ background: C.primary }} className="w-full" onClick={() => { const items = Object.entries(cart).filter(([, q]) => q > 0).map(([productId, qty]) => ({ productId, qty })); if (!items.length) return toast({ title: "Carrinho vazio" }); const o: Order = { id: crypto.randomUUID(), clientId: currentUser!.id, storeId, status: "procurando_motoboy", address, items, baseDeliveryCents: BASE_DELIVERY_CENTS, storeFeeCents: STORE_FEE_CENTS, motoboyDiscountCents: MOTOBOY_DISCOUNT_CENTS, platformRevenueCents: PLATFORM_REVENUE_CENTS, storePaysCents: BASE_DELIVERY_CENTS + STORE_FEE_CENTS, motoboyReceivesCents: BASE_DELIVERY_CENTS - MOTOBOY_DISCOUNT_CENTS, createdAt: new Date().toISOString() }; setOrders((prev) => [o, ...prev]); addLog("createOrder", "Pedido criado", o.id); toast({ title: "Pedido criado" }); }}>Criar pedido</Button></CardContent></Card><Card style={{ background: C.card, borderRadius: 20 }}><CardHeader><CardTitle>Histórico</CardTitle></CardHeader><CardContent>{my.length === 0 ? <p style={{ color: C.sub }}>Sem pedidos</p> : my.map((o) => <div key={o.id} className="border-b border-white/10 py-2"><p>{o.id.slice(0, 8)} • {o.status}</p><p style={{ color: C.sub }}>{formatBRL(o.storePaysCents)}</p></div>)}</CardContent></Card></div>);
  };

  const Lojista = () => { const mineStores = stores.filter((s) => s.ownerUserId === currentUser?.id); const mineOrders = orders.filter((o) => mineStores.some((s) => s.id === o.storeId));
    const move = (id: string, st: OrderStatus) => { setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: st } : o)); addLog("updateOrderStatus", `Lojista atualizou para ${st}`, id); };
    return shell("Home Lojista", <Card style={{ background: C.card, borderRadius: 20 }}><CardContent className="p-4">{mineOrders.length === 0 ? <p style={{ color: C.sub }}>Nenhum pedido ativo.</p> : mineOrders.map((o) => <div key={o.id} className="mb-3 p-3 rounded-xl border border-white/10"><p>Pedido {o.id.slice(0, 8)} - {o.status}</p><p style={{ color: C.sub }}>Lojista paga: {formatBRL(o.storePaysCents)}</p><div className="flex flex-wrap gap-2 mt-2"><Button onClick={() => move(o.id, "aceito")} style={{ background: C.primary }}>Aceitar</Button><Button variant="outline" onClick={() => move(o.id, "cancelado")}>Cancelar</Button></div></div>)}</CardContent></Card>);
  };

  const Motoboy = () => {
    const me = currentUser!;
    const open = orders.filter((o) => o.status === "procurando_motoboy" || (o.motoboyId === me.id && o.status !== "entregue" && o.status !== "cancelado"));
    const wallet = wallets.find((w) => w.userId === me.id) || { userId: me.id, balanceCents: 0 };
    const upd = (id: string, st: OrderStatus) => {
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: st, motoboyId: o.motoboyId || me.id } : o));
      addLog("updateOrderStatus", `Motoboy atualizou para ${st}`, id);
      if (st === "entregue") {
        const order = orders.find((o) => o.id === id);
        if (order) setWallets((prev) => prev.map((w) => w.userId === me.id ? { ...w, balanceCents: w.balanceCents + order.motoboyReceivesCents } : w));
      }
    };
    return shell("Home Motoboy", <Card style={{ background: C.card, borderRadius: 20 }}><CardContent className="p-4 space-y-3"><p>Carteira: {formatBRL(wallet.balanceCents)}</p><Button style={{ background: C.primary }} onClick={() => setUsers((prev) => prev.map((u) => u.id === me.id ? { ...u, motoboyStatus: u.motoboyStatus === "online" ? "offline" : "online" } : u))}>Status: {me.motoboyStatus}</Button>{open.length === 0 ? <p style={{ color: C.sub }}>Sem entregas</p> : open.map((o) => <div key={o.id} className="p-3 rounded-xl border border-white/10"><p>Pedido {o.id.slice(0, 8)} - {o.status}</p><p style={{ color: C.sub }}>Você recebe: {formatBRL(o.motoboyReceivesCents)}</p><div className="flex flex-wrap gap-2 mt-2"><Button onClick={() => upd(o.id, "aceito")} style={{ background: C.primary }}>Aceitar</Button><Button variant="outline" onClick={() => upd(o.id, "indo_coleta")}>Indo coleta</Button><Button variant="outline" onClick={() => upd(o.id, "coletado")}>Coletado</Button><Button variant="outline" onClick={() => upd(o.id, "indo_entrega")}>Em rota</Button><Button onClick={() => upd(o.id, "entregue")} style={{ background: C.primary }}>Entregue</Button></div></div>)}</CardContent></Card>);
  };

  const Admin = () => {
    const revenue = orders.filter((o) => o.status === "entregue").reduce((t, o) => t + o.platformRevenueCents, 0);
    const pendingUsers = users.filter((u) => u.approvalStatus === "aguardando_aprovacao");
    return shell("Dashboard Admin", <div className="grid md:grid-cols-2 gap-4"><Card style={{ background: C.card, borderRadius: 20 }}><CardHeader><CardTitle>Métricas</CardTitle></CardHeader><CardContent><p>Pedidos totais: {orders.length}</p><p>Pedidos ativos: {orders.filter((o) => !["entregue", "cancelado"].includes(o.status)).length}</p><p>Receita plataforma: {formatBRL(revenue)}</p></CardContent></Card><Card style={{ background: C.card, borderRadius: 20 }}><CardHeader><CardTitle>Aprovações e bloqueios</CardTitle></CardHeader><CardContent>{pendingUsers.length === 0 ? <p style={{ color: C.sub }}>Sem pendências</p> : pendingUsers.map((u) => <div key={u.id} className="flex justify-between py-2 border-b border-white/10"><span>{u.email}</span><div className="flex gap-2"><Button onClick={() => { setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, approvalStatus: "aprovado" } : x)); addLog("approveUser", `Usuário aprovado ${u.email}`); }} style={{ background: C.primary }}>Aprovar</Button><Button variant="outline" onClick={() => setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, approvalStatus: "bloqueado" } : x))}>Bloquear</Button></div></div>)}</CardContent></Card><Card style={{ background: C.card, borderRadius: 20 }} className="md:col-span-2"><CardHeader><CardTitle>Logs operacionais</CardTitle></CardHeader><CardContent>{logs.length === 0 ? <p style={{ color: C.sub }}>Sem logs.</p> : logs.slice(0, 30).map((l) => <p key={l.id} className="text-sm">[{new Date(l.createdAt).toLocaleTimeString("pt-BR")}] {l.type}: {l.message}</p>)}</CardContent></Card></div>);
  };

  const roleRoute = useMemo(() => !currentUser ? "/login" : currentUser.role === "cliente" ? "/cliente" : currentUser.role === "lojista" ? "/lojista" : currentUser.role === "motoboy" ? "/motoboy" : "/admin", [currentUser]);
  const blocked = currentUser && ["bloqueado", "suspenso", "recusado"].includes(currentUser.approvalStatus);

  const Pending = () => shell("Aprovação pendente", <Card style={{ background: C.card, borderRadius: 20 }}><CardContent className="p-4"><p style={{ color: C.sub }}>Seu cadastro está em análise pelo admin.</p></CardContent></Card>);
  const Blocked = () => shell("Conta bloqueada/suspensa", <Card style={{ background: C.card, borderRadius: 20 }}><CardContent className="p-4"><p style={{ color: C.sub }}>Entre em contato com o suporte operacional.</p></CardContent></Card>);

  return <BrowserRouter><Routes><Route path="/" element={<Navigate to={roleRoute} replace />} /><Route path="/login" element={<Login />} /><Route path="/cadastro" element={<Cadastro />} /><Route path="/cliente" element={canAccess(currentUser) && currentUser?.role === "cliente" ? <Cliente /> : blocked ? <Blocked /> : currentUser ? <Pending /> : <Navigate to="/login" replace />} /><Route path="/cliente/lojas" element={<Navigate to="/cliente" replace />} /><Route path="/cliente/pedido/:id" element={<Navigate to="/cliente" replace />} /><Route path="/lojista" element={canAccess(currentUser) && currentUser?.role === "lojista" ? <Lojista /> : blocked ? <Blocked /> : currentUser ? <Pending /> : <Navigate to="/login" replace />} /><Route path="/motoboy" element={canAccess(currentUser) && currentUser?.role === "motoboy" ? <Motoboy /> : blocked ? <Blocked /> : currentUser ? <Pending /> : <Navigate to="/login" replace />} /><Route path="/admin" element={canAccess(currentUser) && currentUser?.role === "admin" ? <Admin /> : blocked ? <Blocked /> : currentUser ? <Pending /> : <Navigate to="/login" replace />} /></Routes></BrowserRouter>;
}

export default App;
