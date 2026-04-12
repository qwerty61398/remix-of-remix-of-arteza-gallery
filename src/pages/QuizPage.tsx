import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import VinylPlayer from "@/components/quiz/VinylPlayer";
import { usePaintingsByCollection } from "@/hooks/use-paintings";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { CollectionType } from "@/data/paintings";

interface Question {
  id: number;
  question: string;
  options: { label: string; collections: string[] }[];
}

interface Track {
  name: string;
  artist: string;
  duration: string;
}

interface PlaylistData {
  name: string;
  tracks: Track[];
  spotifyUri?: string;
  coverImage?: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What colors make you feel most at peace?",
    options: [
      { label: "Warm earth tones (orange, brown, terracotta)", collections: ["cultural-chronicles", "natures-palette"] },
      { label: "Bold and vibrant (red, blue, yellow)", collections: ["abstract-expressions"] },
      { label: "Soft and dreamy (pastels, muted tones)", collections: ["dreamscapes", "portraits-and-personalities"] },
      { label: "Cool and serene (blue, green, purple)", collections: ["natures-palette", "dreamscapes"] },
    ],
  },
  {
    id: 2,
    question: "What mood do you want your art to evoke?",
    options: [
      { label: "Energy and passion", collections: ["abstract-expressions"] },
      { label: "Tranquility and calm", collections: ["natures-palette", "dreamscapes"] },
      { label: "Connection and emotion", collections: ["portraits-and-personalities"] },
      { label: "Cultural pride and heritage", collections: ["cultural-chronicles"] },
    ],
  },
  {
    id: 3,
    question: "What subjects interest you most?",
    options: [
      { label: "Landscapes and nature", collections: ["natures-palette"] },
      { label: "People and portraits", collections: ["portraits-and-personalities"] },
      { label: "Abstract shapes and colors", collections: ["abstract-expressions"] },
      { label: "Cultural and traditional themes", collections: ["cultural-chronicles"] },
    ],
  },
  {
    id: 4,
    question: "Where would you hang your new painting?",
    options: [
      { label: "Living room - a statement piece", collections: ["abstract-expressions", "cultural-chronicles"] },
      { label: "Bedroom - something calming", collections: ["dreamscapes", "natures-palette"] },
      { label: "Office - inspiring and thoughtful", collections: ["portraits-and-personalities", "abstract-expressions"] },
      { label: "Hallway - eye-catching and colorful", collections: ["cultural-chronicles", "natures-palette"] },
    ],
  },
  {
    id: 5,
    question: "How would you describe your personal style?",
    options: [
      { label: "Modern and minimalist", collections: ["abstract-expressions"] },
      { label: "Bohemian and eclectic", collections: ["cultural-chronicles", "dreamscapes"] },
      { label: "Classic and elegant", collections: ["portraits-and-personalities", "natures-palette"] },
      { label: "Romantic and dreamy", collections: ["dreamscapes", "portraits-and-personalities"] },
    ],
  },
];

const playlistData: Record<string, PlaylistData> = {
  "abstract-expressions": {
    name: "Emotional Chaos: Abstract Echoes",
    spotifyUri: "08urlAbX1qSQyN0yYQ6w0z",
    coverImage: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c48d436c8676a68c04eb7f4a",
    tracks: [
      { name: "The Workshop", artist: "Francesco Giovannangelo", duration: "1:29" },
      { name: "Snows Of Stillness", artist: "Craig McConnell", duration: "3:03" },
      { name: "Wandering In The Deep", artist: "Francesco Giovannangelo", duration: "3:12" },
      { name: "Bossam", artist: "Morris Lionel", duration: "4:16" },
      { name: "Troubled Waters Pedal Guitar", artist: "Pete Bax", duration: "2:29" },
      { name: "Luscious", artist: "Richard Freitas", duration: "3:18" },
      { name: "Say Yes Again To Love", artist: "Paul Reece", duration: "4:05" },
      { name: "New Heights Uke", artist: "Denis Turbide", duration: "2:08" },
      { name: "Quantum Is0", artist: "Image Sounds", duration: "1:37" },
      { name: "Acoustic Showdown", artist: "Mathew McGrath", duration: "3:48" },
      { name: "Mansion Of Happiness", artist: "Vagabond Beach", duration: "3:15" },
      { name: "Down By The River Next To The Hill", artist: "Matt Rank", duration: "3:04" },
      { name: "Blues Over Easy", artist: "Michael Panasuk", duration: "2:16" },
      { name: "Sunday Dream", artist: "Rob Johnson", duration: "2:01" },
      { name: "I'll Be With You", artist: "Dean Anthony Caputo", duration: "4:52" },
      { name: "Inside Love", artist: "D. Silverstone", duration: "1:49" },
      { name: "Crossing Over", artist: "Luke Gartner-Brereton", duration: "2:28" },
      { name: "The Bizarre Folk String Instrument", artist: "Rik Roberts", duration: "2:26" },
      { name: "Heading Home", artist: "Jonathan Geer", duration: "0:32" },
      { name: "Going Home", artist: "Eric Bode", duration: "1:47" },
    ],
  },
  "cultural-chronicles": {
    name: "Heritage Harmonies: Global Tales",
    spotifyUri: "0NC3PaztFNHJDBt78XFzj0",
    coverImage: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84b6e3b8b0e36461412a6f4856",
    tracks: [
      { name: "March", artist: "Haxhigeaszy", duration: "2:24" },
      { name: "From Rusholme with Love", artist: "Mint Royale", duration: "5:06" },
      { name: "Zeina", artist: "Petrol Bomb Samosa", duration: "4:49" },
      { name: "Kundu Tribal", artist: "James Asher", duration: "5:01" },
      { name: "Dharawi Nights", artist: "Secretpath", duration: "3:57" },
      { name: "Ziganochka", artist: "Golden Ring Ensemble", duration: "3:07" },
      { name: "Parallel Life", artist: "The Starseeds", duration: "8:09" },
      { name: "Pae Pae", artist: "Tamure Tahitien", duration: "1:17" },
      { name: "Fire Mountain", artist: "Zuma Dionys", duration: "7:35" },
      { name: "Vietnamese Forest", artist: "Asian Traditional Music", duration: "1:10" },
      { name: "Old Bagdad", artist: "Jerry Goldsmith", duration: "2:03" },
      { name: "Silver Keys", artist: "Simon Shavi", duration: "3:40" },
      { name: "Master Blaster (Live)", artist: "Joe Driscoll & Sekou Kouyate", duration: "3:47" },
      { name: "Nani", artist: "Kaatru", duration: "3:27" },
      { name: "Dünya", artist: "Yavuz Çetin", duration: "4:59" },
      { name: "'Ote'a Heivari'i", artist: "Mahealani Uchiyama", duration: "1:06" },
      { name: "Adobe Walls", artist: "Gary Stroutsos", duration: "3:21" },
      { name: "Always Waiting", artist: "Kaya Project & Irina Mikhailova", duration: "7:17" },
      { name: "Pétards chinois", artist: "Mathias Duplessy & The Violins of the World", duration: "4:05" },
      { name: "Holographic Universe", artist: "Thievery Corporation & Gunjan", duration: "3:42" },
    ],
  },
  "dreamscapes": {
    name: "Surreal Serenades: Dreamweaver Tunes",
    tracks: [
      { name: "Patience", artist: "AudioQuattro", duration: "2:33" },
      { name: "Dust", artist: "Jason Greenberg", duration: "3:27" },
      { name: "New Horizon", artist: "D. Silverstone", duration: "3:04" },
      { name: "Words Fail", artist: "The Valery Trails", duration: "4:29" },
      { name: "Emotional Moment", artist: "Tom Croke", duration: "3:01" },
      { name: "No Way Home", artist: "Deep", duration: "1:37" },
      { name: "Nighttime in Toronto", artist: "Aaron Saloman", duration: "2:45" },
      { name: "A Million Love Songs", artist: "Orly Vardy", duration: "3:44" },
      { name: "My Heart Goes Jingle", artist: "Suchitra Lata", duration: "2:57" },
      { name: "Flashing Wood", artist: "Salip Tarakci", duration: "4:44" },
      { name: "Modern Ibiza Club Superstar Dance Music", artist: "Bobby Cole", duration: "4:13" },
      { name: "Reflection Matrix", artist: "Gregor Laharnar", duration: "2:48" },
      { name: "The Music Our Love Makes", artist: "Nicole-Marie", duration: "4:11" },
      { name: "Traveling Towards Each Other", artist: "Nemanja Mitrasevic", duration: "3:33" },
      { name: "Home", artist: "Claudio Miosga", duration: "4:42" },
      { name: "It Comes in Waves", artist: "Richard Hughes", duration: "3:18" },
      { name: "The Maze", artist: "Sean van der Maten", duration: "3:31" },
      { name: "Amazing Glow Chorus", artist: "Suchitra Lata", duration: "3:13" },
      { name: "Scarlet Pop", artist: "Enrico Milardo", duration: "1:48" },
      { name: "Lighten the Load", artist: "Jive Ass Sleepers", duration: "2:15" },
    ],
  },
  "natures-palette": {
    name: "Earth's Symphony: Natural Rhythms",
    spotifyUri: "5vKWPUDiP1QdsjJOjFbCLN",
    coverImage: "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8470d229cb865e8b81ab7a39ad",
      { name: "Pleasant Cricket Chorus", artist: "Pamela Grand Nature Collective", duration: "2:24" },
      { name: "Chilled White Noise", artist: "Larry Hill Club Nature", duration: "1:44" },
      { name: "Glorious Fire Harmonies", artist: "Lylou Olegovich Nature Collection", duration: "2:28" },
      { name: "Bonfire Flow", artist: "Richard Johnson", duration: "2:21" },
      { name: "Mellow Rain on Vintage Thunder", artist: "Eric Library of Nature Sounds", duration: "1:57" },
      { name: "Vintage Feel with Rainy Storm", artist: "Isla Wagner Calm Sound Collection", duration: "2:12" },
      { name: "Hurricane Storm", artist: "Anastasia Natura Music", duration: "2:27" },
      { name: "Colors of the Wind", artist: "Jack Lewi Nature Collective", duration: "1:58" },
      { name: "Water Fountain in Rainforest", artist: "Eric Library of Nature Sounds", duration: "1:53" },
      { name: "Bluish Country Morning", artist: "Dimitri Kuznetsov", duration: "2:08" },
      { name: "Colossal Mountain Wind Summer Day", artist: "Duyi Zhang", duration: "1:45" },
      { name: "Sunrise Fire Motion", artist: "Enlai Chen", duration: "2:29" },
      { name: "Love and Soft Rain", artist: "Cyrilo Lombardi", duration: "1:49" },
      { name: "Enticing Melodies of Summer Birds", artist: "Emma Scott Nature Studio", duration: "2:25" },
      { name: "Inside The Cave", artist: "Adam n Joan Nature Library", duration: "2:01" },
      { name: "Murky Water Ripples", artist: "Luis Laurent", duration: "2:35" },
      { name: "Birds Peace Sound", artist: "Abella Rossi Nature Musica", duration: "2:11" },
      { name: "Japaneses Quail", artist: "Mr. Austin Nature Hub", duration: "2:26" },
      { name: "Sweetness of Night", artist: "Marcello Meyer", duration: "1:36" },
      { name: "Dreary Rain", artist: "Gabriel Gashi Nature Seasons", duration: "1:57" },
    ],
  },
  "portraits-and-personalities": {
    name: "Soulful Gazes: Human Essence",
    tracks: [
      { name: "Canon in D Major, P. 37", artist: "Johann Pachelbel & Piotr Chelique", duration: "3:08" },
      { name: "Yo Soy", artist: "Carope", duration: "7:24" },
      { name: "Lou Francis", artist: "Odessa", duration: "1:35" },
      { name: "Traveling Light", artist: "Hior Chronik", duration: "2:21" },
      { name: "Vindheks", artist: "Rumpistol", duration: "5:14" },
      { name: "Aqua", artist: "Ryuichi Sakamoto", duration: "4:32" },
      { name: "Something Waits For You (Nedda)", artist: "Juan Pablo Garcia", duration: "3:37" },
      { name: "We Contain Multitudes", artist: "Yiruma & Ólafur Arnalds", duration: "4:24" },
      { name: "Experience", artist: "Ludovico Einaudi & Daniel Hope", duration: "5:15" },
      { name: "Bird Language", artist: "Will August Park", duration: "3:27" },
      { name: "Vendaval", artist: "Ismael Pinkler & Nicolás Bacal", duration: "2:39" },
      { name: "Iknowwhereyoucomefrom", artist: "Juan Pablo Garcia", duration: "3:27" },
      { name: "La Cuna del Cisne", artist: "YoSoyMatt", duration: "2:33" },
      { name: "A Host for All Kinds of Life", artist: "Green-House", duration: "3:59" },
      { name: "Jay", artist: "Ludovico Einaudi", duration: "3:12" },
      { name: "CC", artist: "Radiotrónica", duration: "2:12" },
      { name: "Quiescent 01", artist: "Kampala Social Club", duration: "3:21" },
      { name: "sunrise mtn", artist: "Jenny Owen Youngs & John Mark Nelson", duration: "2:31" },
      { name: "Chansu wa jibun de tsukuru mono", artist: "Katsuragi Taisuke", duration: "2:32" },
      { name: "Hankyu Denshya", artist: "Yama Warashi", duration: "3:46" },
    ],
  },
};

const collectionNames: Record<string, string> = {
  "abstract-expressions": "Abstract Expressions",
  "cultural-chronicles": "Cultural Chronicles",
  "dreamscapes": "Dreamscapes",
  "natures-palette": "Nature's Palette",
  "portraits-and-personalities": "Portraits and Personalities",
};

function QuizResults({
  recommendedSlug,
  playlist,
  onExplore,
  onRetake,
}: {
  recommendedSlug: string;
  playlist: PlaylistData;
  onExplore: () => void;
  onRetake: () => void;
}) {
  const collectionName = collectionNames[recommendedSlug] as CollectionType;
  const { data: paintings } = usePaintingsByCollection(collectionName);
  const displayPaintings = (paintings || []).slice(0, 6);

  return (
    <div className="min-h-[80vh] py-12 animate-fade-in">
      <div className="container px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Perfect Match Found!
          </h1>
          <p className="text-lg text-muted-foreground">
            We recommend the <span className="text-primary font-semibold">{collectionNames[recommendedSlug]}</span> collection
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Click the vinyl to listen to <span className="italic">{playlist.name}</span>
          </p>
        </div>

        {/* Grid: Vinyl left, Paintings right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Left: Vinyl + Embed */}
          <div className="flex flex-col items-center justify-start">
            <VinylPlayer
              playlistName={playlist.name}
              spotifyUri={playlist.spotifyUri}
              coverImage={playlist.coverImage}
            />
          </div>

          {/* Right: Paintings Mosaic */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 auto-rows-[140px]">
            {displayPaintings.map((painting, i) => (
              <div
                key={painting.id}
                className={cn(
                  "rounded-lg overflow-hidden relative group",
                  i === 0 && "col-span-2 row-span-2",
                  i === 3 && "col-span-2"
                )}
                style={{
                  animation: `mosaic-float ${3 + (i % 3) * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                <ImageWithSkeleton
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end p-2">
                  <span className="text-primary-foreground text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {painting.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button size="lg" onClick={onExplore} className="gap-2">
            Explore Collection
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" onClick={onRetake}>
            Retake Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function QuizPage() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);

    if (!isLastQuestion) {
      setTimeout(() => {
        const newAnswers = [...answers, index];
        setAnswers(newAnswers);
        setSelectedOption(null);
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
      setAnswers(answers.slice(0, -1));
    }
  };

  const getRecommendedCollection = () => {
    const collectionScores: Record<string, number> = {};

    answers.forEach((answerIndex, questionIndex) => {
      const option = questions[questionIndex].options[answerIndex];
      option.collections.forEach((collection) => {
        collectionScores[collection] = (collectionScores[collection] || 0) + 1;
      });
    });

    const topCollection = Object.entries(collectionScores).sort((a, b) => b[1] - a[1])[0];
    return topCollection?.[0] || "natures-palette";
  };

  if (showResult) {
    const recommendedSlug = getRecommendedCollection();
    const playlist = playlistData[recommendedSlug];

    return (
      <QuizResults
        recommendedSlug={recommendedSlug}
        playlist={playlist}
        onExplore={() => navigate(`/gallery/${recommendedSlug}`)}
        onRetake={() => {
          setCurrentQuestion(0);
          setAnswers([]);
          setSelectedOption(null);
          setShowResult(false);
        }}
      />
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-[80vh] flex items-center py-12">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-primary animate-float" />
            </div>
            <span className="text-sm font-medium text-primary">Get Inspired</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Light Up Your Art Journey With A Collection That Speaks To You
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Answer a few questions and discover artwork that matches your unique taste
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div key={currentQuestion} className="bg-card border border-border rounded-xl p-8 animate-fade-in">
            <h2 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-6 text-center">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  className={cn(
                    "w-full p-4 rounded-lg border text-left transition-all",
                    selectedOption === index
                      ? "border-primary bg-primary/5 text-foreground"
                      : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {isLastQuestion && (
              <Button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="gap-2"
              >
                See Results
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
