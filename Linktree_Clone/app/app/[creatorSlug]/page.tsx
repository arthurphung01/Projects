"use client";

import { useEffect, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import supabase from "@/utils/supabaseClient";

type Link = {
  title: string;
  url: string;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated]  = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const [links, setLinks] = useState<Link[]>();
  const [images, setImages] = useState<ImageListType>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>();

  const searchParams = useSearchParams()
  const creatorSlug = searchParams.get('/')

  const onChange  = (imageList: ImageListType) => {
    setImages(imageList);
  }

  useEffect(() => {
    const getUser  = async () => {
      const user = await supabase.auth.getUser();
      console.log("user: ", user);
      if (user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    };

    getUser();
  }, []);
  
  useEffect(() => {
    const getLinks = async () =>  {
      try {
        const { data, error }  =  await supabase
        .from("links")
        .select("title, url")
        .eq("user_id", userId);

      if (error) throw error;
      setLinks(data)
      } catch (error)  {
        console.log("error: ",  error);
      }
      
    };
    if (userId) {
      getLinks()
    }
  }, [userId]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const {data, error} = await supabase
        .from("users")
        .select("profile_picture_url")
        //.select("id, profile_picture_url")
        .eq("id", userId);
        //.eq("username", creatorSlug);
        if (error) throw error;
        const profilePictureUrl = data[0]["profile_picture_url"];
        //const userId = data[0]["id"];
        setProfilePictureUrl(profilePictureUrl);     
        setUserId(userId);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    if (userId) {
      getUser()
    }
  }, [userId]);
    /*if (creatorSlug) {
      getUser()
    }
  }, [creatorSlug]);*/

  const addNewLink = async () => {
    try{
      if (title && url && userId) {
        const { data, error } = await supabase.from("links").insert({
          title: title,
          url: url,
          user_id: userId,
        }).select();
        if (error) throw error;
        console.log("data: ", data)
        if (links) {
          setLinks([...data, ...links])
        }        
      }
    } catch (error) {
      console.log("error: ", error);
    }
    
    
  }
  
  const uploadProfilePicture = async () => {
    try {
      if  (images.length > 0 ) {
        const image =  images[0]
        if (image.file &&  userId) { 
          const { data,  error } = await supabase.storage
          .from("public1")
          .upload(`${userId}/${image.file.name}`, image.file,{upsert: true});
          if (error) throw error;
          const resp = supabase.storage.from("public1").getPublicUrl(data.path);
          const publicUrl = resp.data.publicUrl;
          const updateUserResponse = await supabase.from("users").update({profile_picture_url: publicUrl}).eq("id", userId);
          if (updateUserResponse.error) throw error;
        }
      }
    } catch (error) {
      console.log("error: ", error);
    }
    
  }

  return (
    <div className="flex flex-col w-full justify-center items-center mt-4">
      {profilePictureUrl && <Image src={profilePictureUrl}
      alt="profile-picture"
      height={100}
      width={100}
      className="rounded-full"
      />}
      {links?.map((link: Link, index: number) => (
        <div 
        className="shadow-xl w-96 bg-indigo-500 mt-4 p-4 rounded-lg text-center text-white"
        key={index}
        onClick={(e) => {
          e.preventDefault();
          window.location.href = link.url;
        }}
        >{link.title}</div>
      ))}
      
      {isAuthenticated && (
        <>
        <div className="mt-4">
          <h1> New Links Creation </h1>
          <div className="mt-4">
            <div className="block text-sm font-medium text-gray-700">
              Title
            </div>
              <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-justify"
                  placeholder="my awesome link"
                  onChange={(e) => setTitle(e.target.value)}
              />
          </div>

          <div className="mt-4">
            <div className="block text-sm font-medium text-gray-700">
              Url
            </div>
              <input
                  type="text"
                  name="url"
                  id="url"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-justify"
                  placeholder="https://www.youtube.com/"
                  onChange={(e) => setUrl(e.target.value)}
              />
          </div>

          <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4 text-white hover:bg-indigo-700"
              onClick={addNewLink}
          >
              Add new link
          </button>


        </div>

        <div>
          <h1>Image Uploading</h1>
            <div className="App">
              
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={1}
                dataURLKey="data_url"
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  // write your building UI
                  <div className="upload__image-wrapper bg-slate-300 p-5 rounded-lg items-center">
                    <button
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Click or Drop here
                    </button>
                    &nbsp;

                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img src={image['data_url']} alt="" width="100" />
                        <div className="image-item__btn-wrapper">
                          <button onClick={() => onImageUpdate(index)}>Update</button>
                          <button onClick={() => onImageRemove(index)}>Remove</button>
                        </div>
                      </div>
                    ))}


                    <button onClick={onImageRemoveAll}>Remove all images</button>

                    
                    
                  </div>
                )}
              </ImageUploading>

              <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm mt-4 text-white hover:bg-indigo-700"
              onClick={uploadProfilePicture}
              >
                  Upload Profile Picture
              </button>


            </div>
        </div>


        </>
      )}
      
    </div>
  )
}
