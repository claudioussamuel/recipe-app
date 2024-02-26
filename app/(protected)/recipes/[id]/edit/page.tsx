'use client'

import { RecipeData } from "@/app/lib/definitions";
import { getRecipe } from "@/app/lib/recipe-actions";
import Form from "@/app/ui/recipes/edit-form";
import { usePathname } from "next/navigation";

export function extractMiddleSegment(path: string): string {
    const segments = path.split('/');
    const filteredSegments = segments.filter(segment => segment.length >  0);
    return filteredSegments[1];  
  }
  

export default async function Page() {

    const pathname = usePathname();
    const recipe : RecipeData = await getRecipe(extractMiddleSegment(pathname));
    return (
        <main>
            <Form recipe={recipe}/>
            </main>
    );
}