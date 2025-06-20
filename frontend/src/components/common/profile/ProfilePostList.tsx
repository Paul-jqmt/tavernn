import {PublicPost} from "@/types/publicPost.ts";
import {useEffect, useState} from "react";
import {useUser} from "@/contexts/UserContext.tsx";

export default function ProfilePostList() {
    const {user} = useUser();
    const [ posts, setPosts ] = useState<PublicPost[]>([]);

    useEffect(() => {
        fetchUserPosts()
    }, [user]);

    const fetchUserPosts = ()=> {

    }

    return (
        <div className='h-full flex flex-col overflow-hidden space-y-4'>
            <h3 className='page-subtitle'>My activity</h3>

            {/*   LIST WITH ALL THE POSTS MADE BY THE USER   */}
            <div className='bg-muted overflow-y-auto hide-scrollbar space-y-6'>
                {posts.map((post : PublicPost) => (
                    <div key={post.id} className='flex items-center justify-between'>
                        <p className='font-bold'>{post.title}</p>
                        <p className='font-light'>{post.content}</p>
                        <p className='text-xs font-light text-muted mt-4'>{post.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}