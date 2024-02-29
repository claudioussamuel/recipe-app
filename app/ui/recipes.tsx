"use client";



import { LucideGhost } from "lucide-react";
import { useEffect, useState } from "react";
import { RecipeContainer } from "./recipies-container";
import { RecipeData } from "../lib/definitions";
import { RecipeCard } from "./recipe-card";

interface GlobalRecipesProps {
    initial: RecipeData[];
  }
  

export function GlobalRecipe( {initial} : GlobalRecipesProps) {
//   const [data, setData] = useState<RecipeData[]>([]);



  return (
    <>
      <RecipeContainer>
        {initial.map((x) => (
          <RecipeCard 
          key={x.id}
          category={x.category} 
          // difficulty={x.difficulty}
           id={x.id} 
           ingredients={x.ingredients}
            name={x.name} 
            time={x.time} 
            url={x.url} 
            checkedTags={x.checkedTags} 
            instructions={x.instructions}            
           
          />
        ))}
      </RecipeContainer>
      {initial && initial.length == 0 && (
        <div className="flex h-24 w-full flex-row items-center justify-center gap-4 rounded-3xl bg-secondary">
          <LucideGhost className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <p>Looks like no one has listened to anything, yet!</p>
        </div>
      )}
    </>
  );
}
