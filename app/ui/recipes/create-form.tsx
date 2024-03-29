'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  BuildingStorefrontIcon, 
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { auth, storage } from "@/firebase/config";
import { uploadBytesResumable,UploadTaskSnapshot ,ref, getDownloadURL} from "firebase/storage";
import React, {ChangeEvent,useEffect,useState} from "react";
import { useRouter } from 'next/navigation'
import { addRecipe } from '@/app/lib/recipe-actions';
import DashboardSkeleton from '../skeletons';
import { useUser } from '@/app/lib/auth';
import { onAuthStateChanged } from 'firebase/auth';


 
var catigory =[
  {
      name:"breakfast",
      id: "breakfast"
  },
  {
      name:"lunch",
      id: "lunch"
  },{
      name:"dinner",
      id: "dinner"
  },{
      name:"dessert",
      id: "dessert"
  }
] 

const tags = [
  { id: 'Free', name: 'Free' },
  { id: 'Sweet', name: 'Sweet' },
  { id: 'Cool', name: 'Cool' },
];

export default function Form() {

  var url : string;
  const router = useRouter()
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [checkedTags, setCheckedTags] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    
     const unsubscribe = onAuthStateChanged(auth, (user) => {
       if (user) {
         setUserId(user.uid); 
       }
     });
 
     // Cleanup subscription on unmount
     return () => unsubscribe();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setError('');
   
    }
  
};
const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
  const { id,name } = e.target;
  setCheckedTags(prevState => ({ ...prevState, [id]: name }));
};


const handleUpload = () => {
  return new Promise((resolve, reject) => {
    if (image) {
      const storageRef = ref(storage, `recipes/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *  100;
          console.log('Upload is ' + progress + '% done');
          setLoading(true)
        },
        (error) => {
          console.error(error.message);
          reject(error);
        },
        async () => {
          console.log("upload success");
          try {
             url = await getDownloadURL(storageRef);
            console.log(url);
            resolve(url); 
          } catch (error) {
            console.error("Error getting download URL", error);
            reject(error);
          }
          setLoading(true)
        }
      );
    } else {
      reject(new Error('No image to upload'));
      throw Error;
    }
  });
};


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!image){
      setError('Please select a file.');
    } else{

      const formData = new FormData(event.currentTarget);
      const name = formData.get('name');
      const ingredients = formData.get('ingredients');
      const instructions = formData.get('instructions');
      const time = formData.get('time');
      const category = formData.get('category');
      const difficulty = formData.get('status');
  
        
      await handleUpload().then(url => {
      
        addRecipe({
          userId:userId,
          name: `${name}`,
          ingredients: `${ingredients}`,
          instructions: `${instructions}`,
          time: `${time}`,
          category: `${category}`,
          checkedTags: checkedTags,
          url: url as string,
        });
      }).catch(error => {
        console.error('Error during upload:', error);
      });
      
      router.push("/")
    }
  
  
   
  };


  return (
    <div>

    {
      loading ?  <DashboardSkeleton /> :  <div className="rounded-md bg-gray-50 p-8 md:p-6">

      <form onSubmit={handleSubmit} >
  <div >
 
    <div className="mb-4">

<div className="flex items-center justify-center w-full">
<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
    <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
    </div>
    <input 
    id="dropzone-file"
     type="file" 
     name="image"
     accept="image/*"
     className="hidden"
      onChange={handleChange} 
     
      />
</label>
</div> 
{error &&(<div className='text-red-400'>{error}</div>)}
{image && (
    <div className="mt-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">Selected file: {fileName}</p>
    </div>
  )}
  
     
      <label htmlFor="name" className="mb-2 block text-sm font-medium">
        Name
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id="name"
            name="name"
            type="text"
            step="0.01"
            placeholder="Enter name of the food"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="food-error"
            required
          />
          <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
    </div>
  
    <div className="mb-4">
      <label htmlFor="ingredients" className="mb-2 block text-sm font-medium">
        Ingredients
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id="ingredients"
            name="ingredients"
            type="text"
            step="0.01"
            placeholder="Enter ingredients"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="ingredients-error"
            required
          />
          <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
    </div>
 
    <div className="mb-4">
      <label htmlFor="instructions" className="mb-2 block text-sm font-medium">
        Instructions
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id="instructions"
            name="instructions"
            type="text"
            step="0.01"
            placeholder="Enter instructions"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="amount-error"
            required
          />
          <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
    </div>

    <div className="mb-4">
      <label htmlFor="amount" className="mb-2 block text-sm font-medium">
        Cooking Time
      </label>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <input
            id="time"
            name="time"
            type="number"
            step="0.01"
            placeholder="Enter time in minutes"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="amount-error"
            required
          />
          <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
    </div>
    <label htmlFor="time" className="mb-2 block text-sm font-medium">
        Choose Cartigory
      </label>
      <div className="relative">
        <select
          id="category"
          name="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          defaultValue=""
          aria-describedby="category-error"
          required
        >
          <option value="" disabled>
            Select a Cartigory
          </option>
          {catigory.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {/* <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
      </div>

   
   
    <label htmlFor="tags" className="mb-2 block text-sm font-medium">
        Choose Tags
      </label>


    <div>
    {tags.map((tag) => (
      <div key={tag.id} className="flex items-center mb-4">
        <input
          type="checkbox"
          id={tag.id}
          name={tag.id}
          className="peer cursor-pointer rounded border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        onChange={handleChangeTag}
        />
        <label htmlFor={tag.id} className="ml-2 text-sm font-medium">
          {tag.name}
        </label>
      </div>
    ))}
  </div>
  </div>
  <div className="mr-5 mt-6 flex justify-end gap-4  ">
    <Link
      href="/"
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      Cancel
    </Link>
    <Button type="submit">Create Recipe</Button>
  </div>
</form>
</div>
    }

   

</div>
    
  );
  }
