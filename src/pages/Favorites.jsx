import FavoriteStories from "../components/FavoriteStories";

const Favorites = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-none">
      <h1 className="text-3xl font-bold mb-6 text-primary">Favorite Stories</h1>
      <FavoriteStories />
    </div>
  );
};

export default Favorites;
