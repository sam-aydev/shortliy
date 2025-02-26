import HomePage from "./components/HomePage";

export default function Home() {
  return <HomePage />;
}

export function generateMetadata() {
  return {
    title: "Shortl.iy - The Home of Shortened Links!",
  };
}
