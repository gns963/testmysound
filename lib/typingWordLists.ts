// Word lists for the Typing Speed Test — plain, common English vocabulary
// chosen by hand for this project, not copied from any book, article, quiz
// site or word-list dataset. Individual common words aren't copyrightable
// content anyway, but these were picked fresh rather than sourced.

const EASY_WORDS = [
  "the", "and", "you", "that", "was", "for", "are", "with", "his", "they",
  "at", "be", "this", "have", "from", "not", "had", "but", "what", "some",
  "can", "out", "up", "day", "get", "use", "her", "how", "now", "way",
  "may", "say", "each", "she", "all", "one", "our", "him", "who", "will",
  "make", "time", "than", "them", "look", "more", "come", "did", "see", "two",
  "over", "know", "back", "give", "most", "very", "good", "man", "new", "want",
  "well", "also", "just", "like", "into", "then", "many", "here", "long", "down",
] as const;

const MEDIUM_WORDS = [
  "mountain", "journey", "sunshine", "harvest", "whisper", "thunder", "garden", "horizon",
  "festival", "laughter", "mystery", "treasure", "wonder", "adventure", "courage", "freedom",
  "silence", "rhythm", "crystal", "shadow", "feather", "volcano", "chapter", "melody",
  "canyon", "blanket", "lantern", "compass", "orchard", "whistle", "meadow", "glacier",
  "parcel", "marble", "pillow", "ribbon", "falcon", "ember", "granite", "tunnel",
  "prairie", "anchor", "velvet", "cinder", "willow", "quartz", "harbor", "voyage",
  "kingdom", "puzzle", "signal", "ripple", "canvas", "blossom", "current", "cascade",
] as const;

export type TypingDifficulty = "easy" | "medium";

function shuffledWords(source: readonly string[]): string[] {
  const pool = [...source];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

/**
 * Enough words for even a very fast typist (150+ WPM) to never run out
 * within the longest test duration (60s), by repeating shuffled passes over
 * the word list rather than sampling with replacement (which can otherwise
 * repeat the same word back-to-back).
 */
export function generateWordStream(difficulty: TypingDifficulty, minWords = 220): string {
  const source = difficulty === "easy" ? EASY_WORDS : MEDIUM_WORDS;
  const words: string[] = [];
  while (words.length < minWords) {
    words.push(...shuffledWords(source));
  }
  return words.slice(0, minWords).join(" ");
}
