import React, { useState, useEffect } from 'react';
import { Star, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const FavoriteStories = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (story) => {
    const newFavorites = favorites.filter(fav => fav.objectID !== story.objectID);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    toast({
      title: "Removed from favorites",
      description: story.title,
    });
  };

  const filteredFavorites = favorites.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background text-foreground">
      <div className="mb-4 flex">
        <Input
          type="text"
          placeholder="Search favorites..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2 bg-secondary text-secondary-foreground"
        />
        <Button variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {filteredFavorites.length === 0 ? (
        <p className="text-muted-foreground">No favorite stories yet.</p>
      ) : (
        <ul className="space-y-2">
          {filteredFavorites.map((story) => (
            <li key={story.objectID} className="border-b border-border py-2 flex justify-between items-start">
              <div>
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
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFavorite(story)}
                className="text-yellow-500"
              >
                <Star className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteStories;
