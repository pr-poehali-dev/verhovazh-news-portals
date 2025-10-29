import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface User {
  id: string;
  name: string;
  email: string;
}

interface News {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  date: string;
  commentsCount: number;
  excerpt: string;
  status: 'approved' | 'pending';
}

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionText, setNewDiscussionText] = useState('');
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('news');
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const newsData: News[] = [
    {
      id: '1',
      title: 'Открытие нового спортивного комплекса в Верховажье',
      category: 'Спорт',
      excerpt: 'В центре района состоялось торжественное открытие современного спортивного комплекса с бассейном и залами для различных видов спорта.',
      image: 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/966e6ccc-2b18-409d-b652-0910ee559082.jpg',
      date: '28 октября 2025',
      author: 'Администрация района'
    },
    {
      id: '2',
      title: 'Фестиваль народных промыслов соберет мастеров со всей области',
      category: 'Культура',
      excerpt: 'В ноябре в Верховажском районе пройдет традиционный фестиваль народных промыслов, где местные мастера представят свои работы.',
      image: 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/be7f5ae0-7e11-4886-82c0-682862e3d392.jpg',
      date: '27 октября 2025',
      author: 'Редакция'
    },
    {
      id: '3',
      title: 'Модернизация системы водоснабжения завершена',
      category: 'Происшествия',
      excerpt: 'Завершены работы по модернизации системы водоснабжения в трех населенных пунктах района.',
      image: 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/966e6ccc-2b18-409d-b652-0910ee559082.jpg',
      date: '26 октября 2025',
      author: 'Редакция'
    },
    {
      id: '4',
      title: 'Школьники района победили в региональной олимпиаде',
      category: 'Образование',
      excerpt: 'Команда учеников Верховажской школы заняла первое место в региональном этапе олимпиады по математике.',
      image: 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/966e6ccc-2b18-409d-b652-0910ee559082.jpg',
      date: '25 октября 2025',
      author: 'Администрация района'
    },
    {
      id: '5',
      title: 'Новый автобусный маршрут свяжет отдаленные деревни',
      category: 'Объявления',
      excerpt: 'С 1 ноября начнет работу новый автобусный маршрут, который обеспечит транспортное сообщение между отдаленными населенными пунктами.',
      image: 'https://cdn.poehali.dev/projects/a6ed1518-adbc-468c-a8b4-b234e735f104/files/966e6ccc-2b18-409d-b652-0910ee559082.jpg',
      date: '24 октября 2025',
      author: 'Редакция'
    }
  ];

  const discussionsData: Discussion[] = [
    {
      id: '1',
      title: 'Обсуждаем благоустройство центральной площади',
      author: 'Петр Иванов',
      date: '27 октября 2025',
      commentsCount: 15,
      excerpt: 'Предлагаю обсудить проект благоустройства центральной площади. Какие идеи у жителей?',
      status: 'approved'
    },
    {
      id: '2',
      title: 'Организация субботника в парке',
      author: 'Мария Смирнова',
      date: '26 октября 2025',
      commentsCount: 8,
      excerpt: 'Давайте организуем совместный субботник в городском парке. Кто готов присоединиться?',
      status: 'approved'
    },
    {
      id: '3',
      title: 'Нужен ли району новый торговый центр?',
      author: 'Александр Козлов',
      date: '25 октября 2025',
      commentsCount: 23,
      excerpt: 'Идет обсуждение строительства нового торгового центра. Поделитесь своим мнением.',
      status: 'approved'
    }
  ];

  const commentsData: Comment[] = [
    {
      id: '1',
      author: 'Ольга Васильева',
      text: 'Отличная идея! Давно нужно было обновить площадь.',
      date: '27 октября 2025, 14:30'
    },
    {
      id: '2',
      author: 'Сергей Петров',
      text: 'Поддерживаю! Может быть, добавить больше скамеек и детскую площадку?',
      date: '27 октября 2025, 15:15'
    },
    {
      id: '3',
      author: 'Анна Николаева',
      text: 'Согласна с предыдущими комментаторами. Еще бы фонтан хорошо смотрелся.',
      date: '27 октября 2025, 16:20'
    }
  ];

  const handleLogin = () => {
    if (loginEmail === 'admin@verhovag-vestnik.ru' && loginPassword === 'Admin123!') {
      setCurrentUser({ id: '1', name: 'Администратор', email: loginEmail });
    } else if (loginEmail === 'petr.ivanov@mail.ru' && loginPassword === 'User123!') {
      setCurrentUser({ id: '2', name: 'Петр Иванов', email: loginEmail });
    } else {
      alert('Неверный email или пароль');
    }
  };

  const handleRegister = () => {
    if (!privacyAccepted) {
      alert('Необходимо принять условия обработки персональных данных');
      return;
    }
    if (registerName && registerEmail && registerPassword) {
      setCurrentUser({ id: Math.random().toString(), name: registerName, email: registerEmail });
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setPrivacyAccepted(false);
    } else {
      alert('Заполните все поля');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleCreateDiscussion = () => {
    if (!currentUser) {
      alert('Войдите в систему, чтобы создать обсуждение');
      return;
    }
    if (newDiscussionTitle && newDiscussionText) {
      alert('Ваше обсуждение отправлено на модерацию и появится после проверки администратором');
      setNewDiscussionTitle('');
      setNewDiscussionText('');
    } else {
      alert('Заполните все поля');
    }
  };

  const handleAddComment = () => {
    if (!currentUser) {
      alert('Войдите в систему, чтобы оставить комментарий');
      return;
    }
    if (newComment) {
      alert('Комментарий добавлен!');
      setNewComment('');
    }
  };

  const filteredNews = newsData.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-cyan-50">
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm shadow-lg border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="Newspaper" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-white">Верховажский Вестник</h1>
                <p className="text-xs text-white/80">Новости района онлайн</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => setActiveTab('news')}
              >
                Новости
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => setActiveTab('discussions')}
              >
                Обсуждения
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => setShowAbout(true)}
              >
                О нас
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="text-white hover:bg-white/10">
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarFallback className="bg-secondary text-white">
                            {currentUser.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="hidden md:inline">{currentUser.name}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="font-heading">Профиль пользователя</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Имя</Label>
                          <p className="text-lg font-medium">{currentUser.name}</p>
                        </div>
                        <div>
                          <Label>Email</Label>
                          <p className="text-muted-foreground">{currentUser.email}</p>
                        </div>
                        <Button onClick={handleLogout} className="w-full">
                          Выйти
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-white text-primary hover:bg-white/90">
                      <Icon name="LogIn" className="mr-2" size={16} />
                      Вход
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-heading">
                        {authMode === 'login' ? 'Вход в систему' : 'Регистрация'}
                      </DialogTitle>
                      <DialogDescription>
                        {authMode === 'login' ? 'Войдите для доступа ко всем функциям' : 'Создайте аккаунт для участия'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    {authMode === 'login' ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.ru"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Пароль</Label>
                          <Input
                            id="password"
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </div>
                        <Button onClick={handleLogin} className="w-full">
                          Войти
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                          Нет аккаунта?{' '}
                          <button
                            className="text-accent hover:underline"
                            onClick={() => setAuthMode('register')}
                          >
                            Зарегистрироваться
                          </button>
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя</Label>
                          <Input
                            id="name"
                            placeholder="Иван Петров"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-email">Email</Label>
                          <Input
                            id="reg-email"
                            type="email"
                            placeholder="your@email.ru"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-password">Пароль</Label>
                          <Input
                            id="reg-password"
                            type="password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                          />
                        </div>
                        <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                          <input
                            type="checkbox"
                            id="privacy-checkbox"
                            checked={privacyAccepted}
                            onChange={(e) => setPrivacyAccepted(e.target.checked)}
                            className="mt-1 cursor-pointer"
                          />
                          <label htmlFor="privacy-checkbox" className="text-xs text-muted-foreground cursor-pointer">
                            Я согласен на{' '}
                            <button
                              type="button"
                              className="text-primary hover:underline"
                              onClick={(e) => {
                                e.preventDefault();
                                setShowPrivacy(true);
                              }}
                            >
                              обработку персональных данных
                            </button>
                            {' '}и принимаю условия политики конфиденциальности
                          </label>
                        </div>
                        <Button onClick={handleRegister} className="w-full">
                          Зарегистрироваться
                        </Button>
                        <p className="text-sm text-center text-muted-foreground">
                          Уже есть аккаунт?{' '}
                          <button
                            className="text-accent hover:underline"
                            onClick={() => setAuthMode('login')}
                          >
                            Войти
                          </button>
                        </p>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-r from-primary via-accent to-secondary py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 animate-fade-in">
              Новости Верховажского района
            </h2>
            <p className="text-xl text-white/90 mb-8 animate-fade-in">
              Будьте в курсе событий вашего района
            </p>
            <div className="relative max-w-xl mx-auto animate-scale-in">
              <Input
                type="search"
                placeholder="Поиск новостей..."
                className="pl-12 pr-4 py-6 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={24} />
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12 bg-white shadow-md">
            <TabsTrigger value="news" className="font-heading data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="Newspaper" className="mr-2" size={18} />
              Новости
            </TabsTrigger>
            <TabsTrigger value="discussions" className="font-heading data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="MessageSquare" className="mr-2" size={18} />
              Обсуждения
            </TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((news, index) => (
                <Card 
                  key={news.id} 
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in border-0 shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedNews(news)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary/90 text-white border-0">
                      {news.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-heading text-lg line-clamp-2 hover:text-primary transition-colors">
                      {news.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {news.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        <span>{news.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="User" size={14} />
                        <span>{news.author}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 border-0 shadow-xl bg-gradient-to-br from-secondary/10 to-accent/10">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" className="text-white" size={20} />
                  </div>
                  Популярные обсуждения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {discussionsData.slice(0, 3).map((discussion) => (
                    <div 
                      key={discussion.id}
                      className="p-4 bg-white rounded-lg hover:shadow-md transition-all cursor-pointer hover:translate-x-2 duration-300"
                      onClick={() => {
                        setSelectedDiscussion(discussion);
                        setActiveTab('discussions');
                      }}
                    >
                      <h4 className="font-heading font-semibold mb-2 hover:text-primary transition-colors">
                        {discussion.title}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="User" size={14} />
                          <span>{discussion.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="MessageCircle" size={14} />
                          <span>{discussion.commentsCount} комментариев</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-heading font-bold">Все обсуждения</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90">
                    <Icon name="Plus" className="mr-2" size={18} />
                    Создать обсуждение
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-heading">Новое обсуждение</DialogTitle>
                    <DialogDescription>
                      Ваше обсуждение будет проверено модератором перед публикацией
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="discussion-title">Заголовок</Label>
                      <Input
                        id="discussion-title"
                        placeholder="О чем хотите поговорить?"
                        value={newDiscussionTitle}
                        onChange={(e) => setNewDiscussionTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discussion-text">Описание</Label>
                      <Textarea
                        id="discussion-text"
                        placeholder="Опишите тему подробнее..."
                        rows={5}
                        value={newDiscussionText}
                        onChange={(e) => setNewDiscussionText(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleCreateDiscussion} className="w-full">
                      Отправить на модерацию
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {discussionsData.map((discussion, index) => (
                <Card 
                  key={discussion.id}
                  className="hover:shadow-lg transition-all cursor-pointer animate-fade-in border-l-4 border-l-primary"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedDiscussion(discussion)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="font-heading text-xl hover:text-primary transition-colors">
                        {discussion.title}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                        <Icon name="MessageCircle" className="mr-1" size={14} />
                        {discussion.commentsCount}
                      </Badge>
                    </div>
                    <CardDescription>{discussion.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="User" size={14} />
                        <span>{discussion.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        <span>{discussion.date}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <div className="relative h-64 -mx-6 -mt-6 mb-6">
                <img 
                  src={selectedNews.image} 
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  {selectedNews.category}
                </Badge>
              </div>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">{selectedNews.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>{selectedNews.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="User" size={16} />
                    <span>{selectedNews.author}</span>
                  </div>
                </div>
                <p className="text-lg leading-relaxed">{selectedNews.excerpt}</p>
                <p className="text-muted-foreground leading-relaxed">
                  Полный текст новости будет доступен после интеграции с системой управления контентом. 
                  Здесь будет подробное описание событий, фотографии, видео и другие материалы.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedDiscussion} onOpenChange={() => setSelectedDiscussion(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          {selectedDiscussion && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">{selectedDiscussion.title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-4 text-sm mt-2">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={14} />
                      <span>{selectedDiscussion.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={14} />
                      <span>{selectedDiscussion.date}</span>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <p className="text-lg">{selectedDiscussion.excerpt}</p>
                
                <div className="border-t pt-6">
                  <h4 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                    <Icon name="MessageCircle" size={20} />
                    Комментарии ({selectedDiscussion.commentsCount})
                  </h4>
                  
                  <ScrollArea className="h-64 pr-4">
                    <div className="space-y-4">
                      {commentsData.map((comment) => (
                        <div key={comment.id} className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-primary text-white text-xs">
                                {comment.author.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.date}</span>
                              </div>
                              <p className="text-sm">{comment.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="mt-4 space-y-2">
                    <Label htmlFor="new-comment">Ваш комментарий</Label>
                    <Textarea
                      id="new-comment"
                      placeholder="Поделитесь своим мнением..."
                      rows={3}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button onClick={handleAddComment} className="w-full">
                      <Icon name="Send" className="mr-2" size={16} />
                      Отправить комментарий
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl">Политика конфиденциальности</DialogTitle>
            <DialogDescription>
              Обработка и защита персональных данных пользователей
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-bold text-lg mb-2">1. Общие положения</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей 
                  новостного портала «Верховажский Вестник» (далее — Портал). Администрация Портала обязуется соблюдать 
                  конфиденциальность персональных данных в соответствии с Федеральным законом № 152-ФЗ «О персональных данных».
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-2">2. Собираемые данные</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  При регистрации и использовании Портала мы собираем следующие персональные данные:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Имя и фамилия</li>
                  <li>Адрес электронной почты</li>
                  <li>Дата и время регистрации</li>
                  <li>IP-адрес и данные об устройстве</li>
                  <li>Информация о действиях на Портале (публикации, комментарии, обсуждения)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-2">3. Цели обработки данных</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Персональные данные используются для следующих целей:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Регистрация и авторизация пользователей</li>
                  <li>Обеспечение функционирования Портала</li>
                  <li>Модерация контента и предотвращение нарушений</li>
                  <li>Связь с пользователями по вопросам работы Портала</li>
                  <li>Улучшение качества сервисов и пользовательского опыта</li>
                  <li>Соблюдение требований законодательства РФ</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-2">4. Правовые основания обработки</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Обработка персональных данных осуществляется на основании:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mt-2">
                  <li>Согласия пользователя на обработку персональных данных</li>
                  <li>Необходимости исполнения договора (пользовательского соглашения)</li>
                  <li>Требований законодательства Российской Федерации</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-2">5. Защита персональных данных</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Администрация Портала принимает необходимые организационные и технические меры для защиты персональных данных 
                  от неправомерного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также 
                  от иных неправомерных действий. Применяются современные методы шифрования, контроля доступа и защиты информации.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-2">6. Передача данных третьим лицам</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Персональные данные пользователей не передаются третьим лицам, за исключением случаев:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mt-2">
                  <li>Получения согласия пользователя</li>
                  <li>Требования законодательства РФ и запросов уполномоченных государственных органов</li>
                  <li>Необходимости защиты прав и законных интересов Портала или третьих лиц</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-2">7. Срок хранения данных</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, 
                  но не менее периода, установленного законодательством РФ. После достижения целей обработки или 
                  отзыва согласия пользователя данные удаляются или обезличиваются.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-2">8. Права пользователей</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Пользователь имеет право:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Получать информацию о обработке своих персональных данных</li>
                  <li>Требовать уточнения, блокирования или удаления персональных данных</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                  <li>Обжаловать действия Администрации в уполномоченный орган по защите прав субъектов персональных данных</li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-2">9. Использование cookies</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Портал использует технологию cookies для обеспечения функционирования сайта, сохранения пользовательских 
                  настроек и улучшения качества сервиса. Пользователь может настроить свой браузер для отказа от использования 
                  cookies, однако это может ограничить функциональность Портала.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-lg mb-2">10. Изменение Политики</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Администрация Портала оставляет за собой право вносить изменения в настоящую Политику конфиденциальности. 
                  Новая редакция вступает в силу с момента её размещения на Портале. Продолжение использования Портала после 
                  внесения изменений означает согласие с новой редакцией Политики.
                </p>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-heading font-bold text-lg mb-2">11. Контактная информация</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  По вопросам обработки персональных данных обращайтесь:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@verhovag-vestnik.ru</p>
                  <p><strong>Телефон:</strong> +7 (800) 123-45-67</p>
                  <p><strong>Адрес:</strong> с. Верховажье, ул. Центральная, 1</p>
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                <p>Дата последнего обновления: 29 октября 2025 года</p>
                <p className="mt-1">© 2025 Верховажский Вестник. Все права защищены.</p>
              </div>
            </div>
          </ScrollArea>
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              onClick={() => setShowPrivacy(false)} 
              variant="outline"
              className="flex-1"
            >
              Закрыть
            </Button>
            <Button 
              onClick={() => {
                setPrivacyAccepted(true);
                setShowPrivacy(false);
              }}
              className="flex-1"
            >
              Принимаю условия
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAbout} onOpenChange={setShowAbout}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-3xl">О нас</DialogTitle>
            <DialogDescription>
              Новостной портал Верховажского района
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg">
              <h3 className="font-heading font-bold text-xl mb-3">Наша миссия</h3>
              <p className="text-muted-foreground leading-relaxed">
                «Верховажский Вестник» — современный информационный портал, созданный для жителей и гостей Верховажского района. 
                Наша цель — держать вас в курсе всех важных событий, создавать площадку для диалога и укреплять связи внутри местного сообщества.
              </p>
            </div>

            <div>
              <h3 className="font-heading font-bold text-xl mb-4">Что мы делаем</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon name="Newspaper" size={20} className="text-primary" />
                      Актуальные новости
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Освещаем события района: культура, спорт, образование, социальная жизнь и важные объявления.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-secondary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon name="MessageSquare" size={20} className="text-secondary" />
                      Площадка для обсуждений
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Даем возможность жителям высказывать мнения, обсуждать важные вопросы и находить решения вместе.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-accent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon name="Users" size={20} className="text-accent" />
                      Сообщество
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Объединяем людей, помогаем организовывать мероприятия и поддерживаем местные инициативы.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon name="Shield" size={20} className="text-primary" />
                      Модерация контента
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Следим за качеством публикаций и создаем комфортную среду для конструктивного общения.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="font-heading font-bold text-xl mb-4">Редакция</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-white">АР</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Администрация района</p>
                    <p className="text-sm text-muted-foreground">Официальные новости и объявления</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-secondary text-white">Р</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Редакция портала</p>
                    <p className="text-sm text-muted-foreground">Новости, репортажи, интервью</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-xl mb-4 flex items-center gap-2">
                <Icon name="Mail" size={24} className="text-primary" />
                Контактная информация
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Mail" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">info@verhovag-vestnik.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Phone" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Телефон</p>
                      <p className="font-medium">+7 (800) 123-45-67</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="MapPin" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Адрес</p>
                      <p className="font-medium">с. Верховажье, ул. Центральная, 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Clock" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Режим работы</p>
                      <p className="font-medium">Пн-Пт: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-lg text-white">
              <h3 className="font-heading font-bold text-xl mb-2">Присоединяйтесь к нам!</h3>
              <p className="text-white/90 mb-4">
                Станьте частью нашего сообщества. Делитесь новостями, участвуйте в обсуждениях и помогайте делать наш район лучше.
              </p>
              <Button 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => setShowAbout(false)}
              >
                Начать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-primary text-white mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-heading font-bold text-xl mb-4">Верховажский Вестник</h3>
              <p className="text-white/80 text-sm">
                Новостной портал Верховажского района. Будьте в курсе всех событий вашего района.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@verhovag-vestnik.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (800) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>с. Верховажье, ул. Центральная, 1</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Разделы</h4>
              <div className="space-y-2 text-sm text-white/80">
                <div className="hover:text-white cursor-pointer transition-colors">Новости</div>
                <div className="hover:text-white cursor-pointer transition-colors">Обсуждения</div>
                <div 
                  className="hover:text-white cursor-pointer transition-colors"
                  onClick={() => setShowAbout(true)}
                >
                  О нас
                </div>
                <div 
                  className="hover:text-white cursor-pointer transition-colors"
                  onClick={() => setShowPrivacy(true)}
                >
                  Политика конфиденциальности
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
            <p>© 2025 Верховажский Вестник. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;