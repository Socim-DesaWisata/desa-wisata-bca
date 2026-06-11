import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Bot,
    Send,
    User as UserIcon,
    MoreVertical,
    BarChart3,
    PieChart as PieChartIcon,
    Table as TableIcon
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    Legend
} from 'recharts';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type MessageType = 'text' | 'bar-chart' | 'pie-chart' | 'table';

type Message = {
    id: string;
    role: 'user' | 'bot';
    type: MessageType;
    content: string;
    payload?: any;
    timestamp: Date;
};

const MOCK_BAR_DATA = [
    { name: 'Jan', omset: 40000000 },
    { name: 'Feb', omset: 30000000 },
    { name: 'Mar', omset: 20000000 },
    { name: 'Apr', omset: 27800000 },
    { name: 'Mei', omset: 18900000 },
    { name: 'Jun', omset: 23900000 },
];

const MOCK_PIE_DATA = [
    { name: 'Selesai', value: 45, color: '#00893D' },
    { name: 'Proses', value: 25, color: '#0066AE' },
    { name: 'Belum Dimulai', value: 30, color: '#7C7C7C' },
];

const MOCK_TABLE_DATA = [
    { id: 1, desa: 'Desa Lontar', provinsi: 'Jawa Timur', status: 'Aktif', score: 85 },
    { id: 2, desa: 'Desa Mulyosari', provinsi: 'Jawa Tengah', status: 'Draft', score: '-' },
    { id: 3, desa: 'Desa Sukamaju', provinsi: 'Jawa Barat', status: 'Aktif', score: 92 },
    { id: 4, desa: 'Desa Wisata Taro', provinsi: 'Bali', status: 'Aktif', score: 78 },
];

export default function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'bot',
            type: 'text',
            content: 'Halo! Saya asisten virtual SocialImpact BCA. Ada yang bisa saya bantu terkait data desa wisata, UMKM, atau pariwisata hari ini?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            type: 'text',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate network delay and logic
        setTimeout(() => {
            const userInput = userMessage.content.toLowerCase();
            let botResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                type: 'text',
                content: 'Maaf, saya tidak mengerti. Coba tanyakan tentang "grafik omset", "persentase status survey", atau "tabel desa wisata".',
                timestamp: new Date(),
            };

            if (userInput.match(/grafik|bar|chart|omset/)) {
                botResponse = {
                    ...botResponse,
                    type: 'bar-chart',
                    content: 'Berikut adalah grafik tren omset UMKM dalam 6 bulan terakhir:',
                    payload: MOCK_BAR_DATA,
                };
            } else if (userInput.match(/pie|persentase|status/)) {
                botResponse = {
                    ...botResponse,
                    type: 'pie-chart',
                    content: 'Ini adalah persentase status penyelesaian survey saat ini:',
                    payload: MOCK_PIE_DATA,
                };
            } else if (userInput.match(/tabel|data|daftar|desa/)) {
                botResponse = {
                    ...botResponse,
                    type: 'table',
                    content: 'Berikut adalah daftar sebagian desa wisata beserta status dan skornya:',
                    payload: MOCK_TABLE_DATA,
                };
            } else if (userInput.match(/halo|hai|pagi|siang|sore|malam/)) {
                botResponse = {
                    ...botResponse,
                    content: 'Halo! Ada yang ingin Anda ketahui tentang data SocialImpact hari ini?',
                };
            }

            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const renderChart = (message: Message) => {
        if (message.type === 'bar-chart') {
            return (
                <Card className="mt-3 overflow-hidden border-[#EFEFEF] shadow-sm">
                    <CardHeader className="bg-[#F8FBFE] py-3 pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm text-[#303030]">
                            <BarChart3 className="size-4 text-[#0066AE]" />
                            Tren Omset UMKM
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-6">
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={message.payload} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EFEFEF" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#7C7C7C' }} />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fontSize: 12, fill: '#7C7C7C' }}
                                        tickFormatter={(val) => `Rp${val / 1000000}M`}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: '#F8FBFE' }}
                                        formatter={(value: number) => [`Rp ${new Intl.NumberFormat('id-ID').format(value)}`, 'Omset']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 14px rgba(3,17,32,0.08)' }}
                                    />
                                    <Bar dataKey="omset" fill="#0066AE" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            );
        }

        if (message.type === 'pie-chart') {
            return (
                <Card className="mt-3 overflow-hidden border-[#EFEFEF] shadow-sm">
                    <CardHeader className="bg-[#F8FBFE] py-3 pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm text-[#303030]">
                            <PieChartIcon className="size-4 text-[#00893D]" />
                            Status Penyelesaian Survey
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={message.payload}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {message.payload.map((entry: any, index: number) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value: number) => [`${value}%`, 'Persentase']}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 14px rgba(3,17,32,0.08)' }}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            );
        }

        if (message.type === 'table') {
            return (
                <Card className="mt-3 overflow-hidden border-[#EFEFEF] shadow-sm">
                    <CardHeader className="bg-[#F8FBFE] py-3 pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm text-[#303030]">
                            <TableIcon className="size-4 text-[#FF944C]" />
                            Data Desa Wisata
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-[#EFEFEF] bg-[#F7F7F7]">
                                    <tr>
                                        <th className="px-4 py-2 text-xs font-semibold text-[#7C7C7C]">Nama Desa</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-[#7C7C7C]">Provinsi</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-[#7C7C7C]">Status</th>
                                        <th className="px-4 py-2 text-xs font-semibold text-[#7C7C7C]">Skor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#EFEFEF]">
                                    {message.payload.map((row: any) => (
                                        <tr key={row.id} className="hover:bg-[#F8FBFE]">
                                            <td className="px-4 py-2 font-medium text-[#303030]">{row.desa}</td>
                                            <td className="px-4 py-2 text-[#7C7C7C]">{row.provinsi}</td>
                                            <td className="px-4 py-2">
                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                    row.status === 'Aktif' ? 'bg-[#EAF8F0] text-[#00893D]' : 'bg-[#F1F5F8] text-[#7C7C7C]'
                                                }`}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 font-bold text-[#0066AE]">{row.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            );
        }

        return null;
    };

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <>
            <Head title="Chatbot Asisten" />
            <div className="flex h-screen flex-col bg-[#F7F7F7]">
                {/* Header */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#EFEFEF] bg-white px-4 shadow-sm sm:px-6">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="flex size-8 items-center justify-center rounded-lg text-[#7C7C7C] hover:bg-[#F1F5F8]">
                            <ArrowLeft className="size-5" />
                        </Link>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="size-10 border-2 border-[#EFEFEF]">
                                    <AvatarFallback className="bg-[#EAF3FF] text-[#0066AE]">
                                        <Bot className="size-5" />
                                    </AvatarFallback>
                                </Avatar>
                                <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-[#00893D]"></span>
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-[#303030]">SocialImpact Bot</h1>
                                <p className="text-xs text-[#00893D]">Online</p>
                            </div>
                        </div>
                    </div>
                    <button className="flex size-8 items-center justify-center rounded-lg text-[#7C7C7C] hover:bg-[#F1F5F8]">
                        <MoreVertical className="size-5" />
                    </button>
                </header>

                {/* Chat Area */}
                <div 
                    ref={scrollAreaRef}
                    className="flex-1 overflow-y-auto p-4 sm:p-6"
                >
                    <div className="mx-auto flex max-w-4xl flex-col gap-6">
                        {/* Welcome Banner */}
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066AE] to-[#2FA6FC] text-white shadow-lg">
                                <Bot className="size-8" />
                            </div>
                            <h2 className="text-xl font-bold text-[#303030]">Tanya Asisten AI</h2>
                            <p className="mt-2 max-w-md text-sm text-[#7C7C7C]">
                                Dapatkan data real-time, grafik tren, dan laporan program CSR Desa Wisata BCA melalui percakapan.
                            </p>
                            
                            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
                                <button 
                                    onClick={() => { setInput('Tampilkan grafik omset UMKM'); document.getElementById('chat-input')?.focus(); }}
                                    className="rounded-lg border border-[#EFEFEF] bg-white p-3 text-xs font-semibold text-[#0066AE] shadow-sm transition hover:bg-[#F8FBFE]"
                                >
                                    📊 Grafik Tren Omset
                                </button>
                                <button 
                                    onClick={() => { setInput('Bagaimana persentase status survey?'); document.getElementById('chat-input')?.focus(); }}
                                    className="rounded-lg border border-[#EFEFEF] bg-white p-3 text-xs font-semibold text-[#0066AE] shadow-sm transition hover:bg-[#F8FBFE]"
                                >
                                    🥧 Status Survey
                                </button>
                                <button 
                                    onClick={() => { setInput('Tampilkan data tabel desa wisata'); document.getElementById('chat-input')?.focus(); }}
                                    className="rounded-lg border border-[#EFEFEF] bg-white p-3 text-xs font-semibold text-[#0066AE] shadow-sm transition hover:bg-[#F8FBFE]"
                                >
                                    📋 Tabel Data Desa
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        {messages.map((message) => (
                            <div 
                                key={message.id} 
                                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <Avatar className="mt-1 size-8 shrink-0 border border-[#EFEFEF]">
                                    {message.role === 'user' ? (
                                        <AvatarFallback className="bg-[#F1F5F8] text-[#7C7C7C]">
                                            <UserIcon className="size-4" />
                                        </AvatarFallback>
                                    ) : (
                                        <AvatarFallback className="bg-[#0066AE] text-white">
                                            <Bot className="size-4" />
                                        </AvatarFallback>
                                    )}
                                </Avatar>

                                <div className={`flex max-w-[85%] flex-col gap-1 sm:max-w-[75%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-[#303030]">
                                            {message.role === 'user' ? 'Anda' : 'SocialImpact Bot'}
                                        </span>
                                        <span className="text-[10px] text-[#A0A0A0]">
                                            {formatTime(message.timestamp)}
                                        </span>
                                    </div>
                                    
                                    <div className={`rounded-2xl px-4 py-2.5 text-sm ${
                                        message.role === 'user' 
                                            ? 'rounded-tr-sm bg-[#0066AE] text-white' 
                                            : 'rounded-tl-sm border border-[#EFEFEF] bg-white text-[#303030] shadow-sm'
                                    }`}>
                                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                    </div>

                                    {/* Rich Content (Charts/Tables) */}
                                    {message.role === 'bot' && message.type !== 'text' && (
                                        <div className="w-full max-w-2xl mt-1">
                                            {renderChart(message)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex gap-3">
                                <Avatar className="mt-1 size-8 shrink-0 border border-[#EFEFEF]">
                                    <AvatarFallback className="bg-[#0066AE] text-white">
                                        <Bot className="size-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex items-end gap-1">
                                    <div className="flex items-center rounded-2xl rounded-tl-sm border border-[#EFEFEF] bg-white px-4 py-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="size-1.5 animate-bounce rounded-full bg-[#A0A0A0]" style={{ animationDelay: '0ms' }}></span>
                                            <span className="size-1.5 animate-bounce rounded-full bg-[#A0A0A0]" style={{ animationDelay: '150ms' }}></span>
                                            <span className="size-1.5 animate-bounce rounded-full bg-[#A0A0A0]" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="shrink-0 bg-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] sm:px-6">
                    <div className="mx-auto max-w-4xl">
                        <form 
                            onSubmit={handleSend}
                            className="relative flex items-end gap-2 rounded-2xl border border-[#DCE7F1] bg-[#F8FBFE] p-1.5 transition-colors focus-within:border-[#0066AE] focus-within:bg-white"
                        >
                            <Input 
                                id="chat-input"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tanyakan seputar data, statistik, atau informasi desa wisata..."
                                className="min-h-12 border-0 bg-transparent px-4 py-3 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                                disabled={isTyping}
                                autoComplete="off"
                            />
                            <Button 
                                type="submit" 
                                disabled={!input.trim() || isTyping}
                                className="mb-0.5 mr-0.5 size-10 shrink-0 rounded-xl bg-[#0066AE] p-0 text-white hover:bg-[#093967] disabled:bg-[#DDE4EC] disabled:text-[#A0A0A0]"
                            >
                                <Send className="size-4" />
                            </Button>
                        </form>
                        <p className="mt-2 text-center text-[10px] text-[#A0A0A0]">
                            Chatbot ini adalah simulasi. Data yang ditampilkan hanyalah mock data.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
