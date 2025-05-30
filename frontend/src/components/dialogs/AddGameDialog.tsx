import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select.tsx";
import * as React from "react";
import type { Game } from "@/types/game.ts";
import {useEffect} from "react";

type AddGameDialogProps = {
  trigger: React.ReactNode;
  onSubmit: (game: Game, level: string) => void;
};

export default function AddGameDialog({ trigger, onSubmit }: AddGameDialogProps) {
  const [ games, setGames ] = React.useState<Game[]>([]);
  const [ gameId, setGameId ] = React.useState<string>('');
  const [ level, setLevel ] = React.useState('');

  useEffect(() => {
    fetch("/api/games/")
        .then((res) => res.json())
        .then((data) => setGames(data))
        .catch((err) => console.error('Failed to load games:', err));
  }, []);

  const handleSubmit = () => {
    const game = games.find((g) => g.id === gameId);
    if (game && level) {
      onSubmit(game, level);
    }
  };

  return (
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className='bg-deep-purple text-white rounded-xl max-w-md'>
          <DialogHeader>
            <DialogTitle>Add game</DialogTitle>
            <DialogDescription className='text-white font-extralight'>Add a game to your profile</DialogDescription>
          </DialogHeader>

          <div className='space-y-5 p-6'>

            {/*   GAME SELECTION   */}
            <div>
              <Label className='mb-2'>Choose game:</Label>
              <Select value={gameId} onValueChange={setGameId}>
                <SelectTrigger className='bg-white text-deep-purple w-full'>
                  <SelectValue placeholder='Game'></SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {
                    games.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        No games found
                      </div>
                    ) : (
                      games.map((game) => (
                          <SelectItem key={game.id} value={game.id}>{game.name}</SelectItem>
                      ))
                    )
                  }
                </SelectContent>
              </Select>
            </div>

            {/*   LEVEL SELECTION   */}
            <div>
              <Label className='mb-2'>Choose level:</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className='bg-white text-deep-purple w-full'>
                  <SelectValue placeholder='Level'></SelectValue>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value='beginner'>Beginner</SelectItem>
                  <SelectItem value='intermediate'>Intermediate</SelectItem>
                  <SelectItem value='advanced'>Advanced</SelectItem>
                  <SelectItem value='professional'>Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className='flex justify-center gap-4 mt-6'>
            <DialogClose asChild>
              <Button variant='destructive'>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                  className='bg-light-purple text-white'
                  onClick={handleSubmit}
                  disabled={!gameId || !level}>Add</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
}