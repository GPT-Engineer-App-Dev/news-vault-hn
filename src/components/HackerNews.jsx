import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const fetchHackerNewsStories = async () => {
  const response = await fetch(
    'https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100'
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HackerNews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['hackerNewsStories'],
    queryFn: fetchHackerNewsStories,
  });

  const filteredStories = data?.hits?.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (error) {
    return <div className="text-destructive">Error: {error.message}</div>;
  }

  return (
    <div className="bg-background text-foreground">
      <div className="mb-4 flex">
        <Input
          type="text"
          placeholder="Search stories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2 bg-secondary text-secondary-foreground"
        />
        <Button variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-2">
          {filteredStories.map((story) => (
            <li key={story.objectID} className="border-b border-border py-2">
              <h2 className="text-lg font-semibold mb-1">
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {story.title}
                </a>
              </h2>
              <p className="text-sm text-muted-foreground">
                {story.points} points | by {story.author} | {story.num_comments} comments
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HackerNews;
