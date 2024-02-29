


import { db } from "@/firebase/config";
import { 
    collection,
     updateDoc,
      deleteDoc,
       doc, 
        getDoc, 
         getDocs,
          DocumentSnapshot,
          addDoc,
          setDoc
         } from "firebase/firestore";
import { RecipeData } from "./definitions";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from 'next/cache';
import { useUser } from "./auth";




export const addRecipe = async (
    {
    name,
    ingredients,
    instructions,
    time,
    category,
    userId,
    checkedTags,
    url
}:
{
    name: string,
    ingredients:string,
    instructions:string,
    time:string,
    category:string,
    checkedTags: {},
    url:string,
    userId:string,

}) => {

   
    try {
        const docRef = doc(db, "users",userId);
        const subcollectionRef = collection(docRef, 'recipe');
        const newDoc = doc(subcollectionRef); 

        const docId = newDoc.id;
        await setDoc(newDoc, {
            id:`${docId}`,
            name,
            ingredients,
            instructions,
            time,
            category,
            checkedTags,
            url
        });
    
    } catch (err) {
      
        console.error(err)
}

}

export const deleteRecipe =  async (id: string) => {
   
    try {
        await deleteDoc(doc(db,"users",id,"recipe", id));
    } catch (err) {
  
    }

}


export const updateRecipe = async (recipe: RecipeData,userId:string) => {
    
    try {


            console.log(recipe)
        const parentDocRef = doc(db, "users", userId);
        const docRef = doc(parentDocRef, "recipe", recipe.id);
        await updateDoc(docRef,recipe );
     
    } catch (err) {
       
    }
}


export async function  getRecipe(id:string,userId:string)  {
    
    try {
        const doRef = doc(db, "users",userId,"recipe",id);
		const doSnap = await getDoc(doRef);
      
        if (doSnap.exists()) {
            return doSnap.data() as RecipeData;   
        }

    } catch (err) { 
        //throw new Error('Failed to fetch recipe.');       
        console.log(err)    
 }
 return {
    id:"",
    name: ``,
    ingredients: ``,
    instructions: ``,
    time: ``,
    category: ``,
    difficulty: ``,
    checkedTags: {},
    url: ``,
  };

}

export async function  getAllRecipe(userId:string)  {
    noStore();
    
    {
    const parentDocRef = doc(db, "users", userId);
    const colRef = collection(parentDocRef, "recipe");
    const snapshots = await getDocs(colRef);
    
    const docs: RecipeData[] = snapshots.docs.map(
        (doc: DocumentSnapshot) => {
            const data = doc.data() as RecipeData;
            data.id = doc.id;
            return data;
        }
    );
    
    return {
        recipes: docs,
    };
}  
}


export async function searchRecipes(recipes: RecipeData[], searchString: string) {
    console.log(searchString)
    return recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchString.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchString.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchString.toLowerCase()) ||
      recipe.instructions.toLowerCase().includes(searchString.toLowerCase())
    );
  }



 export async function searchCategory(recipes: RecipeData[], searchString: string) {
    return recipes.filter(recipe =>
      recipe.category.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  export function extractMiddleSegment(path: string): string {
    const segments = path.split('/');
    const filteredSegments = segments.filter(segment => segment.length >  0);
    return filteredSegments[1];  
  }
  