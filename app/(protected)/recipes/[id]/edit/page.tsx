'use client'

import { RecipeData } from "@/app/lib/definitions";
import { extractMiddleSegment, getRecipe } from "@/app/lib/recipe-actions";
import Form from "@/app/ui/recipes/edit-form";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

   
    const [recipeees, setRecipeees] = useState<RecipeData>();
    const pathname = usePathname();


    useEffect(() => {
        
        const fetchRecipes = async () => {
            
            const recipe : RecipeData = await getRecipe(extractMiddleSegment(pathname));
          setRecipeees(recipe);
        };
    
        fetchRecipes();
      }, []);

      if(recipeees)
    return (
        <main>
            <Form recipe={recipeees}/>
            </main>
    );
}