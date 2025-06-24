
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Heart, 
  MessageCircle, 
  User, 
  Clock, 
  ChevronUp, 
  Filter, 
  Users,
  PlusCircle,
  ThumbsUp,
  ListFilter,
  Send,
  Bookmark // Import the Bookmark icon
} from 'lucide-react';
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

// Define post types
type PostCategory = 'sleep' | 'anxiety' | 'support' | 'tips' | 'question' | 'success';

interface Post {
  id: number;
  author: string;
  avatarUrl?: string;
  category: PostCategory;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  isAnonymous: boolean;
  isPinned?: boolean;
  isModerator?: boolean;
}

interface Comment {
  id: number;
  postId: number;
  author: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
  likes: number;
  isAnonymous: boolean;
  isModerator?: boolean;
}

const Community = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<PostCategory>('question');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  
  // Mock post data
  const postsData: Post[] = [
    {
      id: 1,
      author: "SleepExpert",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      category: "tips",
      title: "5 Techniques That Helped Me Overcome Insomnia",
      content: "After struggling with insomnia for years, I've finally found some techniques that actually work for me. I wanted to share them in case they help anyone else...",
      timestamp: "2 hours ago",
      likes: 42,
      comments: 15,
      isAnonymous: false,
      isPinned: true,
      isModerator: true
    },
    {
      id: 2,
      author: "AnxiousNights",
      category: "anxiety",
      title: "Night Anxiety is Ruining My Sleep",
      content: "Every night when I try to sleep, my mind starts racing with worries and I can't quiet my thoughts. Has anyone else dealt with this? What helps you?",
      timestamp: "6 hours ago",
      likes: 15,
      comments: 23,
      isAnonymous: true
    },
    {
      id: 3,
      author: "MindfulMeditator",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      category: "success",
      title: "How Meditation Transformed My Sleep Quality",
      content: "I've been practicing mindfulness meditation for 30 days now, and the impact on my sleep has been incredible. I used to wake up multiple times per night...",
      timestamp: "1 day ago",
      likes: 78,
      comments: 32,
      isAnonymous: false
    },
    {
      id: 4,
      author: "NewParentZombie",
      avatarUrl: "https://i.pravatar.cc/150?img=4",
      category: "support",
      title: "Exhausted New Parent Seeking Advice",
      content: "I haven't had more than 3 consecutive hours of sleep in months since my baby was born. I'm absolutely exhausted and starting to feel depressed. Any tips from other parents?",
      timestamp: "2 days ago",
      likes: 56,
      comments: 41,
      isAnonymous: false
    },
    {
      id: 5,
      author: "NightOwlStruggling",
      category: "question",
      title: "How to Reset My Circadian Rhythm?",
      content: "I've been a night owl my entire life, but now I need to start waking up early for a new job. Any advice on how to reset my internal clock?",
      timestamp: "3 days ago",
      likes: 28,
      comments: 19,
      isAnonymous: false
    },
    {
      id: 6,
      author: "SleepTechEnthusiast",
      avatarUrl: "https://i.pravatar.cc/150?img=6",
      category: "tips",
      title: "Sleep Tracking Apps - My Experience with 5 Popular Options",
      content: "Over the past few months, I've tested several sleep tracking apps and devices. Here's my review of each one with pros and cons...",
      timestamp: "4 days ago",
      likes: 93,
      comments: 47,
      isAnonymous: false
    }
  ];
  
  // Mock comments data
  const commentsData: Comment[] = [
    {
      id: 1,
      postId: 1,
      author: "SleepBetter",
      avatarUrl: "https://i.pravatar.cc/150?img=10",
      content: "These are great tips! I've been trying the progressive muscle relaxation technique you mentioned and it's been a game-changer for me.",
      timestamp: "1 hour ago",
      likes: 8,
      isAnonymous: false
    },
    {
      id: 2,
      postId: 1,
      author: "InsomniaFighter",
      content: "I've been struggling with sleep for years. Going to try your breathing technique tonight. Thank you for sharing!",
      timestamp: "1 hour ago",
      likes: 5,
      isAnonymous: true
    },
    {
      id: 3,
      postId: 1,
      author: "SleepTherapist",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
      content: "As a sleep therapist, I'd also recommend keeping a sleep journal to track patterns. Great list of techniques though - these align perfectly with what we recommend to patients.",
      timestamp: "2 hours ago",
      likes: 15,
      isAnonymous: false,
      isModerator: true
    }
  ];
  
  // Filter posts based on search term and category
  const filteredPosts = postsData.filter(post => {
    const matchesSearch = 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === null || 
      post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort posts with pinned posts first
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });
  
  // Format time for display
  const formatTime = (timeString: string) => {
    return timeString;
  };
  
  // Create a new post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostTitle || !newPostContent) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and content for your post.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Post Created",
      description: "Your post has been successfully published to the community."
    });
    
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostForm(false);
  };
  
  // Submit a comment
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentContent) {
      toast({
        title: "Empty Comment",
        description: "Please enter some content for your comment.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Comment Posted",
      description: "Your comment has been added to the discussion."
    });
    
    setCommentContent('');
  };
  
  // Like a post
  const handleLikePost = (postId: number) => {
    toast({
      title: "Post Liked",
      description: "You've liked this post."
    });
  };
  
  // Open post details
  const openPostDetails = (post: Post) => {
    setSelectedPost(post);
  };
  
  // Close post details
  const closePostDetails = () => {
    setSelectedPost(null);
  };
  
  // Get post category badge styling
  const getCategoryBadgeStyles = (category: PostCategory) => {
    switch(category) {
      case 'sleep':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'anxiety':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'support':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'tips':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'question':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
      case 'success':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <Header />
      
      <main className="container px-4 mx-auto pt-8 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Community</h1>
              <p className="text-muted-foreground">
                Connect with others on their sleep and mental wellness journey
              </p>
            </div>
            
            <Button onClick={() => setShowNewPostForm(!showNewPostForm)} className="mt-4 md:mt-0">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
          
          {showNewPostForm && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create a New Post</CardTitle>
                <CardDescription>
                  Share your experiences, ask questions, or provide support to others
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      placeholder="Enter a descriptive title"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setNewPostCategory('sleep')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newPostCategory === 'sleep' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        Sleep
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPostCategory('anxiety')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newPostCategory === 'anxiety' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        Anxiety
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPostCategory('support')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newPostCategory === 'support' 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        Support
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPostCategory('tips')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newPostCategory === 'tips' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        Tips
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPostCategory('question')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newPostCategory === 'question' 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        Question
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPostCategory('success')}
                        className={`px-3 py-1 rounded-full text-sm ${
                          newPostCategory === 'success' 
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        Success Story
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content</label>
                    <Textarea 
                      placeholder="Share your thoughts, experiences, or questions..."
                      className="min-h-[150px]"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="anonymous" 
                      className="mr-2 h-4 w-4 rounded border-gray-300"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <label htmlFor="anonymous" className="text-sm">
                      Post anonymously
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreatePost}>
                  Publish Post
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Input 
                className="pl-9" 
                placeholder="Search discussions..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-shrink-0">
              <Button variant="outline" className="gap-2">
                <Filter size={18} />
                Filter
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <Card className="md:col-span-1 h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === null ? 'bg-muted' : 'hover:bg-muted/50'
                  }`}
                >
                  All Topics
                </button>
                <button
                  onClick={() => setSelectedCategory('sleep')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === 'sleep' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : 'hover:bg-muted/50'
                  }`}
                >
                  Sleep
                </button>
                <button
                  onClick={() => setSelectedCategory('anxiety')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === 'anxiety' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' : 'hover:bg-muted/50'
                  }`}
                >
                  Anxiety
                </button>
                <button
                  onClick={() => setSelectedCategory('support')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === 'support' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' : 'hover:bg-muted/50'
                  }`}
                >
                  Support
                </button>
                <button
                  onClick={() => setSelectedCategory('tips')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === 'tips' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 'hover:bg-muted/50'
                  }`}
                >
                  Tips & Advice
                </button>
                <button
                  onClick={() => setSelectedCategory('question')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === 'question' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' : 'hover:bg-muted/50'
                  }`}
                >
                  Questions
                </button>
                <button
                  onClick={() => setSelectedCategory('success')}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    selectedCategory === 'success' ? 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100' : 'hover:bg-muted/50'
                  }`}
                >
                  Success Stories
                </button>
              </CardContent>
            </Card>
            
            <div className="md:col-span-3">
              <Tabs defaultValue="discussions" onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="discussions" className="gap-2">
                    <MessageSquare size={16} />
                    Discussions
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="gap-2">
                    <Heart size={16} />
                    Popular
                  </TabsTrigger>
                  <TabsTrigger value="latest" className="gap-2">
                    <Clock size={16} />
                    Latest
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="discussions" className="space-y-4">
                  {sortedPosts.length === 0 ? (
                    <div className="text-center p-8 border rounded-lg">
                      <MessageCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                      <p className="text-muted-foreground mb-4">
                        There are no discussions matching your criteria.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory(null);
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  ) : (
                    sortedPosts.map(post => (
                      <Card key={post.id} className={post.isPinned ? 'border-primary/30 bg-primary/5' : ''}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {post.isPinned && (
                                  <Badge className="bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary">
                                    Pinned
                                  </Badge>
                                )}
                                <Badge className={getCategoryBadgeStyles(post.category)}>
                                  {post.category === 'sleep' && 'Sleep'}
                                  {post.category === 'anxiety' && 'Anxiety'}
                                  {post.category === 'support' && 'Support'}
                                  {post.category === 'tips' && 'Tips'}
                                  {post.category === 'question' && 'Question'}
                                  {post.category === 'success' && 'Success Story'}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg hover:text-primary cursor-pointer" onClick={() => openPostDetails(post)}>
                                {post.title}
                              </CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center mb-3">
                            <Avatar className="h-6 w-6 mr-2">
                              {post.avatarUrl ? (
                                <AvatarImage src={post.avatarUrl} />
                              ) : (
                                <AvatarFallback>
                                  <User size={14} />
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-1">
                                {post.isAnonymous ? "Anonymous" : post.author}
                              </span>
                              {post.isModerator && (
                                <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 ml-1">
                                  Moderator
                                </Badge>
                              )}
                            </div>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {post.content}
                          </p>
                          
                          <div className="flex items-center gap-4">
                            <button 
                              className="flex items-center text-sm text-muted-foreground hover:text-primary"
                              onClick={() => handleLikePost(post.id)}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{post.likes}</span>
                            </button>
                            <button 
                              className="flex items-center text-sm text-muted-foreground hover:text-primary"
                              onClick={() => openPostDetails(post)}
                            >
                              <MessageCircle className="h-4 w-4 mr-1" />
                              <span>{post.comments}</span>
                            </button>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="ghost" size="sm" onClick={() => openPostDetails(post)}>
                            Read More
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="popular" className="space-y-4">
                  {[...sortedPosts].sort((a, b) => b.likes - a.likes).map(post => (
                    <Card key={post.id} className={post.isPinned ? 'border-primary/30 bg-primary/5' : ''}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {post.isPinned && (
                                <Badge className="bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary">
                                  Pinned
                                </Badge>
                              )}
                              <Badge className={getCategoryBadgeStyles(post.category)}>
                                {post.category === 'sleep' && 'Sleep'}
                                {post.category === 'anxiety' && 'Anxiety'}
                                {post.category === 'support' && 'Support'}
                                {post.category === 'tips' && 'Tips'}
                                {post.category === 'question' && 'Question'}
                                {post.category === 'success' && 'Success Story'}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg hover:text-primary cursor-pointer" onClick={() => openPostDetails(post)}>
                              {post.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center mb-3">
                          <Avatar className="h-6 w-6 mr-2">
                            {post.avatarUrl ? (
                              <AvatarImage src={post.avatarUrl} />
                            ) : (
                              <AvatarFallback>
                                <User size={14} />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">
                              {post.isAnonymous ? "Anonymous" : post.author}
                            </span>
                            {post.isModerator && (
                              <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 ml-1">
                                Moderator
                              </Badge>
                            )}
                          </div>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {post.content}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <button 
                            className="flex items-center text-sm text-muted-foreground hover:text-primary"
                            onClick={() => handleLikePost(post.id)}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{post.likes}</span>
                          </button>
                          <button 
                            className="flex items-center text-sm text-muted-foreground hover:text-primary"
                            onClick={() => openPostDetails(post)}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" size="sm" onClick={() => openPostDetails(post)}>
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="latest" className="space-y-4">
                  {/* Newest first - this is mocked since we're not using real timestamps */}
                  {sortedPosts.map(post => (
                    <Card key={post.id} className={post.isPinned ? 'border-primary/30 bg-primary/5' : ''}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {post.isPinned && (
                                <Badge className="bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary">
                                  Pinned
                                </Badge>
                              )}
                              <Badge className={getCategoryBadgeStyles(post.category)}>
                                {post.category === 'sleep' && 'Sleep'}
                                {post.category === 'anxiety' && 'Anxiety'}
                                {post.category === 'support' && 'Support'}
                                {post.category === 'tips' && 'Tips'}
                                {post.category === 'question' && 'Question'}
                                {post.category === 'success' && 'Success Story'}
                              </Badge>
                            </div>
                            <CardTitle className="text-lg hover:text-primary cursor-pointer" onClick={() => openPostDetails(post)}>
                              {post.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center mb-3">
                          <Avatar className="h-6 w-6 mr-2">
                            {post.avatarUrl ? (
                              <AvatarImage src={post.avatarUrl} />
                            ) : (
                              <AvatarFallback>
                                <User size={14} />
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-1">
                              {post.isAnonymous ? "Anonymous" : post.author}
                            </span>
                            {post.isModerator && (
                              <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 ml-1">
                                Moderator
                              </Badge>
                            )}
                          </div>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{formatTime(post.timestamp)}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {post.content}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <button 
                            className="flex items-center text-sm text-muted-foreground hover:text-primary"
                            onClick={() => handleLikePost(post.id)}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{post.likes}</span>
                          </button>
                          <button 
                            className="flex items-center text-sm text-muted-foreground hover:text-primary"
                            onClick={() => openPostDetails(post)}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            <span>{post.comments}</span>
                          </button>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="ghost" size="sm" onClick={() => openPostDetails(post)}>
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Community Guidelines</CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary">
                  <Users className="h-3 w-3 mr-1" />
                  1,245 members
                </Badge>
              </div>
              <CardDescription>
                Our community is a safe space for everyone to share their experiences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Be respectful:</span> Treat others with kindness and empathy. Remember that everyone's sleep journey is unique.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Protect privacy:</span> Do not share personal information about yourself or others. You can post anonymously if you prefer.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Not medical advice:</span> Information shared in the community is not a substitute for professional medical advice.
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded mr-3 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Be supportive:</span> Offer encouragement and constructive feedback. We're all here to help each other sleep better.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {selectedPost && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
              <Card className="w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryBadgeStyles(selectedPost.category)}>
                          {selectedPost.category === 'sleep' && 'Sleep'}
                          {selectedPost.category === 'anxiety' && 'Anxiety'}
                          {selectedPost.category === 'support' && 'Support'}
                          {selectedPost.category === 'tips' && 'Tips'}
                          {selectedPost.category === 'question' && 'Question'}
                          {selectedPost.category === 'success' && 'Success Story'}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{selectedPost.title}</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" onClick={closePostDetails}>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      {selectedPost.avatarUrl ? (
                        <AvatarImage src={selectedPost.avatarUrl} />
                      ) : (
                        <AvatarFallback>
                          <User size={16} />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium">
                          {selectedPost.isAnonymous ? "Anonymous" : selectedPost.author}
                        </span>
                        {selectedPost.isModerator && (
                          <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 ml-2">
                            Moderator
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{formatTime(selectedPost.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="border-b pb-6">
                    <p className="whitespace-pre-line">
                      {selectedPost.content}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <button 
                        className="flex items-center text-sm text-muted-foreground hover:text-primary"
                        onClick={() => handleLikePost(selectedPost.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{selectedPost.likes}</span>
                      </button>
                      <button 
                        className="flex items-center text-sm text-muted-foreground hover:text-primary"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>{selectedPost.comments}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Comments ({commentsData.filter(c => c.postId === selectedPost.id).length})</h3>
                    
                    <div className="space-y-4 mb-6">
                      {commentsData.filter(c => c.postId === selectedPost.id).map(comment => (
                        <div key={comment.id} className="border-b pb-4">
                          <div className="flex items-center mb-2">
                            <Avatar className="h-6 w-6 mr-2">
                              {comment.avatarUrl ? (
                                <AvatarImage src={comment.avatarUrl} />
                              ) : (
                                <AvatarFallback>
                                  <User size={14} />
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="flex items-center">
                              <span className="text-sm font-medium">
                                {comment.isAnonymous ? "Anonymous" : comment.author}
                              </span>
                              {comment.isModerator && (
                                <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 ml-2">
                                  Moderator
                                </Badge>
                              )}
                            </div>
                            <span className="mx-2 text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{formatTime(comment.timestamp)}</span>
                          </div>
                          <p className="text-sm mb-2">
                            {comment.content}
                          </p>
                          <button className="text-xs text-muted-foreground hover:text-primary">
                            <ThumbsUp className="h-3 w-3 inline mr-1" />
                            {comment.likes}
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Add a comment</h4>
                      <form onSubmit={handleSubmitComment} className="space-y-3">
                        <Textarea 
                          placeholder="Share your thoughts..."
                          className="min-h-[80px]"
                          value={commentContent}
                          onChange={(e) => setCommentContent(e.target.value)}
                          required
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="comment-anonymous" 
                              className="mr-2 h-4 w-4 rounded border-gray-300"
                            />
                            <label htmlFor="comment-anonymous" className="text-xs">
                              Comment anonymously
                            </label>
                          </div>
                          <Button type="submit" size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Post Comment
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" size="sm" onClick={closePostDetails}>
                    Close
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save Post
                    </Button>
                    <Button variant="outline" size="sm">
                      <ListFilter className="h-4 w-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Community;
