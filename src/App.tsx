import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";

type Role = "cliente" | "lojista" | "motoboy" | "admin";
type OrderStatus = "novo" | "aceito_lojista" | "preparando" | "pronto_retirada" | "indo_retirar" | "retirado" | "em_rota" | "entregue" | "recusado";

type User = { id: string; email: string; password: string; role: Role; name: string; online?: boolean };
type Store = { id: string; name: string; available: boolean; ownerId: string };
type Product = { id: string; storeId: string; name: string; price: number };
type Order = { id: string; clientId: string; storeId: string; items: { productId: string; qty: number }[]; address: string; status: OrderStatus; motoboyId?: string; createdAt: string };

const DELIVERY_FEE = 7;
const PLATFORM_FEE = 1.5;
const MOTOBOY_EARNING = 5.5;

const seedUsers: User[] = [
  { id: "u1", email: "cliente@meucorre.com", password: "123456", role: "cliente", name: "Cliente Demo" },
  { id: "u2", email: "lojista@meucorre.com", password: "123456", role: "lojista", name: "Açaí do Centro" },
  { id: "u3", email: "motoboy@meucorre.com", password: "123456", role: "motoboy", name: "Carlos Entregas", online: true },
  { id: "u4", email: "admin@meucorre.com", password: "123456", role: "admin", name: "Admin Meu Corre" },
  { id: "u5", email: "motoboy2@meucorre.com", password: "123456", role: "motoboy", name: "Rafael Moto", online: false },
  { id: "u6", email: "motoboy3@meucorre.com", password: "123456", role: "motoboy", name: "João Corre", online: true },
];

const seedStores: Store[] = [
  { id: "s1", name: "Açaí do Centro", available: true, ownerId: "u2" },
  { id: "s2", name: "Hamburgueria Lorena", available: true, ownerId: "u2" },
  { id: "s3", name: "Farmácia Popular", available: true, ownerId: "u2" },
  { id: "s4", name: "Mercado Bairro Forte", available: false, ownerId: "u2" },
];

const seedProducts: Product[] = [
  { id: "p1", storeId: "s1", name: "Açaí 500ml", price: 18 },
  { id: "p2", storeId: "s2", name: "Combo X-Burger", price: 29 },
  { id: "p3", storeId: "s2", name: "Refrigerante", price: 8 },
  { id: "p4", storeId: "s3", name: "Dipirona", price: 11 },
  { id: "p5", storeId: "s4", name: "Cesta básica pequena", price: 65 },
];

const load = <T,>(key: string, fallback: T): T => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(localStorage.getItem("mc_current_user"));

  useEffect(() => {
    setUsers(load("mc_users", seedUsers));
    setStores(load("mc_stores", seedStores));
    setProducts(load("mc_products", seedProducts));
    setOrders(load("mc_orders", [] as Order[]));
  }, []);

  useEffect(() => { localStorage.setItem("mc_users", JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem("mc_stores", JSON.stringify(stores)); }, [stores]);
  useEffect(() => { localStorage.setItem("mc_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("mc_orders", JSON.stringify(orders)); }, [orders]);

  const currentUser = users.find((u) => u.id === currentUserId) || null;

  const logout = () => {
    localStorage.removeItem("mc_current_user");
    setCurrentUserId(null);
  };

  const shell = (title: string, children: React.ReactNode) => (
    <div className="min-h-screen bg-white text-[#101010] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-4">
        <header className="flex items-center justify-between bg-[#FF6A00] text-white rounded-xl p-4">
          <div>
            <h1 className="text-2xl font-bold">Meu Corre $</h1>
            <p className="text-sm">Aqui o seu corre vale mais! • Lorena-SP</p>
          </div>
          <div className="flex items-center gap-2">
            {currentUser && <Badge className="bg-white text-[#101010]">{currentUser.role}</Badge>}
            {currentUser && <Button variant="secondary" onClick={logout}>Sair</Button>}
          </div>
        </header>
        <h2 className="text-xl font-semibold">{title}</h2>
        {children}
      </div>
      <Toaster />
    </div>
  );

  const Login = () => {
    const [email, setEmail] = useState("cliente@meucorre.com");
    const [password, setPassword] = useState("123456");
    const login = () => {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) return toast({ title: "Credenciais inválidas" });
      localStorage.setItem("mc_current_user", user.id);
      setCurrentUserId(user.id);
    };
    return shell("Login", <Card><CardHeader><CardTitle>Acesse sua conta</CardTitle></CardHeader><CardContent className="space-y-3"><Input value={email} onChange={(e)=>setEmail(e.target.value)} /><Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><Button className="w-full bg-[#FF6A00]" onClick={login}>Entrar</Button></CardContent></Card>);
  };

  const Cadastro = () => {
    const [email, setEmail] = useState(""); const [password, setPassword] = useState("123456"); const [role, setRole] = useState<Role>("cliente");
    const create = () => { const nu: User = { id: crypto.randomUUID(), email, password, role, name: email.split("@")[0] }; setUsers((p)=>[...p, nu]); toast({ title: "Cadastro realizado" }); };
    return shell("Cadastro", <Card><CardContent className="p-6 space-y-3"><Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} /><Input value={password} onChange={(e)=>setPassword(e.target.value)} /><Select value={role} onValueChange={(v)=>setRole(v as Role)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{["cliente","lojista","motoboy","admin"].map((r)=><SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><Button className="w-full bg-[#FF6A00]" onClick={create}>Cadastrar</Button></CardContent></Card>);
  };

  const Client = () => {
    const [storeId, setStoreId] = useState(stores[0]?.id); const [cart, setCart] = useState<Record<string, number>>({}); const [address, setAddress] = useState("Rua Principal, 100 - Lorena");
    const visibleProducts = products.filter((p)=>p.storeId===storeId);
    const myOrders = orders.filter((o)=>o.clientId===currentUser?.id);
    const total = Object.entries(cart).reduce((acc,[pid,qty])=>acc+(products.find((p)=>p.id===pid)?.price||0)*qty,0);
    const createOrder = () => { const items = Object.entries(cart).map(([productId, qty])=>({productId,qty})).filter((i)=>i.qty>0); if (!items.length) return; setOrders((p)=>[{id:crypto.randomUUID(),clientId:currentUser!.id,storeId:storeId!,items,address,status:"novo",createdAt:new Date().toISOString()},...p]); setCart({}); toast({title:"Pedido criado"}); };
    return shell("Área do Cliente", <div className="grid md:grid-cols-2 gap-4"><Card><CardHeader><CardTitle>Novo pedido</CardTitle></CardHeader><CardContent className="space-y-3"><Label>Loja</Label><Select value={storeId} onValueChange={setStoreId}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{stores.filter(s=>s.available).map((s)=><SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select>{visibleProducts.map((p)=><div key={p.id} className="flex justify-between"><span>{p.name} - R$ {p.price.toFixed(2)}</span><Input className="w-16" type="number" min={0} value={cart[p.id]||0} onChange={(e)=>setCart((c)=>({...c,[p.id]:Number(e.target.value)}))} /></div>)}<Input value={address} onChange={(e)=>setAddress(e.target.value)} /><p>Total: R$ {(total+DELIVERY_FEE).toFixed(2)}</p><Button className="w-full bg-[#FF6A00]" onClick={createOrder}>Finalizar pedido</Button></CardContent></Card><Card><CardHeader><CardTitle>Histórico</CardTitle></CardHeader><CardContent className="space-y-2">{myOrders.map((o)=><div key={o.id} className="border rounded p-2"><p>{stores.find((s)=>s.id===o.storeId)?.name}</p><p>Status: <b>{o.status}</b></p></div>)}</CardContent></Card></div>);
  };

  const Lojista = () => {
    const update = (id: string, status: OrderStatus) => setOrders((p)=>p.map((o)=>o.id===id?{...o,status}:o));
    return shell("Painel do Lojista", <Card><CardContent className="p-4 space-y-2">{orders.map((o)=><div key={o.id} className="border p-2 rounded"><p>Pedido {o.id.slice(0,6)} - {o.status}</p><div className="flex gap-2 flex-wrap"><Button size="sm" onClick={()=>update(o.id,"aceito_lojista")}>Aceitar</Button><Button size="sm" onClick={()=>update(o.id,"preparando")}>Preparando</Button><Button size="sm" onClick={()=>update(o.id,"pronto_retirada")}>Pronto retirada</Button><Button size="sm" variant="destructive" onClick={()=>update(o.id,"recusado")}>Recusar</Button></div></div>)}</CardContent></Card>);
  };

  const Motoboy = () => {
    const me = users.find((u)=>u.id===currentUser?.id)!;
    const toggle = ()=> setUsers((p)=>p.map((u)=>u.id===me.id?{...u,online:!u.online}:u));
    const available = orders.filter((o)=>o.status==="pronto_retirada" || (o.motoboyId===me.id && o.status!=="entregue"));
    const upd = (id:string, status:OrderStatus)=> setOrders((p)=>p.map((o)=>o.id===id?{...o,status,motoboyId:o.motoboyId||me.id}:o));
    const ganhos = orders.filter((o)=>o.motoboyId===me.id && o.status==="entregue").length * MOTOBOY_EARNING;
    return shell("Painel do Motoboy", <Card><CardContent className="p-4 space-y-2"><Button onClick={toggle}>{me.online?"Ficar offline":"Ficar online"}</Button><p>Ganhos do dia: R$ {ganhos.toFixed(2)}</p>{available.map((o)=><div key={o.id} className="border rounded p-2"><p>{o.id.slice(0,6)} - {o.status}</p><div className="flex gap-2 flex-wrap"><Button size="sm" onClick={()=>upd(o.id,"indo_retirar")}>Aceitar/Indo retirar</Button><Button size="sm" onClick={()=>upd(o.id,"retirado")}>Retirado</Button><Button size="sm" onClick={()=>upd(o.id,"em_rota")}>Em rota</Button><Button size="sm" onClick={()=>upd(o.id,"entregue")}>Entregue</Button></div></div>)}</CardContent></Card>);
  };

  const Admin = () => {
    const andamento = orders.filter((o)=>o.status!=="entregue" && o.status!=="recusado").length;
    const receita = orders.length * PLATFORM_FEE;
    const motoboys = users.filter((u)=>u.role==="motoboy");
    return shell("Dashboard Admin", <div className="grid md:grid-cols-3 gap-4">{[
      ["Pedidos totais", orders.length], ["Em andamento", andamento], ["Receita simulada", `R$ ${receita.toFixed(2)}`], ["Lojas", stores.length], ["Motoboys", motoboys.length], ["Taxa entrega", `R$ ${DELIVERY_FEE.toFixed(2)}`]
    ].map(([k,v])=><Card key={String(k)}><CardContent className="p-4"><p className="text-sm text-gray-500">{k}</p><p className="text-2xl font-bold">{v}</p></CardContent></Card>)}<Card className="md:col-span-3"><CardHeader><CardTitle>Fluxo simulado</CardTitle></CardHeader><CardContent>{orders.map((o)=><p key={o.id}>Pedido {o.id.slice(0,6)}: {o.status}</p>)}</CardContent></Card></div>);
  };

  const roleRoute = useMemo(() => {
    if (!currentUser) return "/login";
    if (currentUser.role === "cliente") return "/cliente";
    if (currentUser.role === "lojista") return "/lojista";
    if (currentUser.role === "motoboy") return "/motoboy";
    return "/admin";
  }, [currentUser]);

  return <BrowserRouter><Routes><Route path="/" element={<Navigate to={roleRoute} replace />} /><Route path="/login" element={<Login />} /><Route path="/cadastro" element={<Cadastro />} /><Route path="/cliente" element={currentUser?.role==="cliente"?<Client/>:<Navigate to="/login" replace />} /><Route path="/cliente/lojas" element={<Navigate to="/cliente" replace />} /><Route path="/cliente/pedido/:id" element={<Navigate to="/cliente" replace />} /><Route path="/lojista" element={currentUser?.role==="lojista"?<Lojista/>:<Navigate to="/login" replace />} /><Route path="/motoboy" element={currentUser?.role==="motoboy"?<Motoboy/>:<Navigate to="/login" replace />} /><Route path="/admin" element={currentUser?.role==="admin"?<Admin/>:<Navigate to="/login" replace />} /></Routes></BrowserRouter>;
}

export default App;
