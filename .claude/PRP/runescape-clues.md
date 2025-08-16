# PRP: Generate 5 RuneScape-Inspired Clue Scrolls

## Objective
Create 5 new clue scroll components with varying difficulty levels, inspired by RuneScape's treasure trail system.

## Context & Research Findings

### Existing Codebase Patterns
The codebase has 4 existing clue components:
1. **MapClue** - Simple image display (web/src/app/clues/MapClue.tsx:1-18)
2. **RiddleClue** - Text-based riddle (web/src/app/clues/RiddleClue.tsx:1-14)
3. **PuzzleClue** - Single character input with attempts (web/src/app/clues/PuzzleClue.tsx:1-60)
4. **SliderPuzzleClue** - Complex interactive 15-puzzle (web/src/app/clues/SliderPuzzleClue.tsx:1-269)

### Component Structure Pattern
```typescript
import { ClueScroll } from '../ClueScroll';

export function ClueName({...props}) {
  return (
    <ClueScroll>
      <div className="text-center">
        {/* Clue content */}
      </div>
    </ClueScroll>
  );
}
```

### Styling Conventions
- Font: `quill-font` class for RuneScape-style text
- Colors: `text-amber-100`, `text-amber-300` for text
- Backgrounds: `bg-amber-50/20` with transparency
- Borders: `border-amber-700/20`
- OSRS button styling defined in styles.css
- Image rendering: `style={{ imageRendering: 'pixelated' }}`

### RuneScape Clue Types Reference
Documentation: https://runescape.wiki/w/Clue_scroll
- **Anagram Clues**: Scrambled NPC names
- **Cipher Clues**: Encoded messages (Caesar, A1Z26)
- **Coordinate Clues**: Location-based puzzles
- **Cryptic Riddles**: Descriptive location hints
- **Emote Clues**: Perform specific actions in order

## Implementation Blueprint

### 5 New Clues to Create

#### 1. KitchenAnagramClue (Easy)
```
File: web/src/app/clues/KitchenAnagramClue.tsx
Description: Unscramble letters to reveal a kitchen item
Anagram: "GRIDF ERATOR" → "REFRIGERATOR"
Display: Scrambled text prominently shown
Input: Text field for answer
Validation: Check against correct answer, case-insensitive
Real-world: Next clue could be hidden in/near the fridge
```

#### 2. LivingRoomRiddleClue (Easy-Medium)
```
File: web/src/app/clues/LivingRoomRiddleClue.tsx
Description: Riddle about common living room furniture
Riddle: "I have four legs but never walk,
         A back but no spine,
         People rest on me to sit and talk,
         In living rooms I'm often fine"
Answer: "COUCH" or "SOFA" or "CHAIR"
Input: Text field for answer
Validation: Accept multiple valid answers
Real-world: Check under couch cushions for next clue
```

#### 3. BedroomAnagramClue (Medium)
```
File: web/src/app/clues/BedroomAnagramClue.tsx
Description: Harder anagram about bedroom items
Anagram: "WALLOP CASE" → "PILLOWCASE"
Hint: "Where you rest your head at night..."
Input: Text field with optional hint button
Validation: Check answer, provide feedback
Real-world: Next clue inside a pillowcase
```

#### 4. BathroomDoubleRiddle (Medium-Hard)
```
File: web/src/app/clues/BathroomDoubleRiddle.tsx
Description: Two-part riddle about bathroom items
Riddle 1: "I have teeth but cannot bite,
          I help keep your smile bright" → "TOOTHBRUSH"
Riddle 2: "I'm full of holes but hold water still,
          Help you clean up with great skill" → "SPONGE"
Input: Two text fields
Validation: Both must be correct to proceed
Real-world: Check bathroom cabinet or medicine chest
```

#### 5. GarageToolAnagrams (Hard)
```
File: web/src/app/clues/GarageToolAnagrams.tsx
Description: Solve 3 tool-related anagrams in sequence
Anagram 1: "HAMSTER" → "HAMMER" (with extra letters)
Anagram 2: "DRIVERS CREW" → "SCREWDRIVER" 
Anagram 3: "RENTAL FIG" → "FINGERNAIL" (trick - not a tool!)
Display: Show one at a time, previous answers stay visible
Input: Text field that resets for each anagram
Validation: Must solve in order, can't skip
Real-world: Final location in garage/toolbox area
```

## Implementation Tasks

1. ✅ Create KitchenAnagramClue component
   - Display scrambled letters in large, clear font
   - Add input field with validation
   - Case-insensitive answer checking
   - Shake animation on wrong answer

2. ✅ Create LivingRoomRiddleClue component
   - Display riddle text in quill-font
   - Add input field for answer
   - Accept multiple valid answers (couch/sofa/chair)
   - Show "Think about furniture..." message on wrong attempts

3. ✅ Create BedroomAnagramClue component
   - Display anagram with hint button
   - Show hint after 2 wrong attempts
   - Track attempts remaining
   - Success animation when solved

4. ✅ Create BathroomDoubleRiddle component
   - Display both riddles clearly separated
   - Two input fields with labels
   - Both must be correct to continue
   - Individual validation feedback

5. ✅ Create GarageToolAnagrams component
   - Progressive anagram display
   - Show solved anagrams above current
   - Reset input for each new anagram
   - Completion celebration on final solve

6. ✅ Update clues/index.tsx
   - Import all 5 new components
   - Add cases 5-9 in switch statement
   - Update props passing

7. ✅ Update app.tsx
   - Change totalClues from 4 to 9
   - Update initial clue index if needed

## Code Examples from Codebase

### Props Pattern (from PuzzleClue)
```typescript
export function PuzzleClue({
  attemptsLeft, 
  setAttemptsLeft, 
  goToNextClue
}: {
  attemptsLeft: number, 
  setAttemptsLeft: React.Dispatch<React.SetStateAction<number>>, 
  goToNextClue: () => void
}) {
  // Component logic
}
```

### State Management Pattern
```typescript
const [answer, setAnswer] = useState('');
const [isShaking, setIsShaking] = useState(false);
const [isError, setIsError] = useState(false);
```

### Animation Classes
```css
.shake { animation: shake 0.6s ease-in-out; }
.input-error { border-color: #8B0000 !important; }
```

## Validation Gates

```bash
# Type checking
npx tsc --noEmit

# Build verification  
npm run build

# Linting (if configured)
npx eslint web/src/app/clues/*.tsx --fix
```

## External Resources
- RuneScape Wiki Clue Scrolls: https://runescape.wiki/w/Clue_scroll
- OSRS Clue Types Guide: https://www.runehq.com/minigame/treasure-trails
- Cipher Tools Reference: https://blog.playerauctions.com/runescape/osrs-clue-scroll-guide/
- Puzzle Patterns: https://github.com/RuneScape-Ciphers/runescape-clue-scroll-solver-and-puzzle-guide

## Success Criteria
- [ ] All 5 clues render correctly in ClueScroll wrapper
- [ ] Each clue has unique interactive mechanics
- [ ] Difficulty progression from easy to hard
- [ ] Consistent styling with existing clues
- [ ] Props properly passed for attempts/navigation
- [ ] Type checking passes
- [ ] Build succeeds

## Additional Context
- Use React hooks (useState, useEffect) as shown in existing components
- Follow the single-file component pattern (no separate CSS files)
- Keep animations smooth with CSS transitions
- Use OSRS-style visual feedback (shake on error, glow on success)
- Consider mobile responsiveness for interactive elements
- Riddles and anagrams work perfectly for both in-person solving and web app
- Focus on text-based puzzles that translate well to paper/verbal presentation

## Example Household Riddle Variations for Future
- "Cold keeper of food, humming day and night" → REFRIGERATOR
- "Glass portal to the outside world, I open but am not a door" → WINDOW
- "Soft landing for the weary, where dreams take flight" → BED
- "I reflect your image but have no thoughts of my own" → MIRROR
- "Guardian of the entrance, I have teeth but no mouth" → KEY
- "Electronic brain on your desk, mouse is my friend" → COMPUTER
- "I get stepped on all day but never complain" → DOORMAT/RUG
- "Hot box that spins your food round and round" → MICROWAVE

## Confidence Score: 10/10
Perfect confidence as these are straightforward text-based puzzles following existing patterns. No complex graphics or interactions needed - just clever wordplay and simple input validation.