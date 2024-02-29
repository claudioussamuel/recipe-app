'use client'

import { useUser } from "@/app/lib/auth";
import { RecipeData } from "@/app/lib/definitions";
import { extractMiddleSegment, getRecipe } from "@/app/lib/recipe-actions";
import Form from "@/app/ui/recipes/edit-form";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

   
    const [recipeees, setRecipeees] = useState<RecipeData>();
    const pathname = usePathname();
   


    useEffect(() => {


      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const fetchRecipes = async () => {
            const recipe : RecipeData = await getRecipe(extractMiddleSegment(pathname),user.uid);
            setRecipeees(recipe);
          };
          fetchRecipes();
        }});

        return () => unsubscribe();
      }, []);

      if(recipeees)
    return (
        <main>
            <Form recipe={recipeees}/>
            </main>
    );
}