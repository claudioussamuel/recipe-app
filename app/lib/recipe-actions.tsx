
import { db } from "@/firebase/config";
import { 
    collection,
     updateDoc,
      deleteDoc,
       doc, 
       onSnapshot,
        where, 
        query, 
        setDoc, 
        getDoc, 
        DocumentData,
         getDocs,
          DocumentSnapshot
         } from "firebase/firestore";
import { RecipeData } from "./definitions";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from 'next/cache';


export const addRecipe = async (
    {
    name,
    ingredients,
    instructions,
    time,
    category,
    difficulty,
    checkedTags,
    url
}:
{
    name: string,
    ingredients:string,
    instructions:string,
    time:string,
    category:string,
    difficulty:string,
    checkedTags: {},
    url:string
}) => {
    try {
      
        const docRef = doc(collection(db, "recipe"));

        const docId = docRef.id;
        await setDoc(docRef, {
            id:`${docId}`,
            name,
            ingredients,
            instructions,
            time,
            category,
            difficulty,
            checkedTags,
            url
        });
    
    } catch (err) {
      
        console.error(err)
}

}

export const deleteRecipe =  async (id: string) => {
    try {
        
        console.log("Claudious again")
        await deleteDoc(doc(db, "recipe", id));
        
       
    } catch (err) {
  
    }

}


export const updateRecipe = async (recipe: RecipeData) => {
    try {

        console.log(recipe);
      await  updateDoc(doc(db,"recipe",recipe.id),recipe) 
     
    } catch (err) {
       
    }
}


export async function  getRecipe(id:string)  {
    try {
        const doRef = doc(db, "recipe", id);
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

export async function  getAllRecipe()  {
    noStore();
    const colRef = collection(db, "recipe");
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