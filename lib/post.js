import path from "path";
import fs from 'fs';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(),"posts");

//mdファイルのデータを取り出す
export function getPostsData(){

    // const fetchDates = await fetch('endpoint');

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName)=>{
        const id = fileName.replace(/\.md$/,""); //id名
        console.log(fileName);

        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory,fileName);
        const fileContents = fs.readFileSync(fullPath,'utf8');

        const matterResult = matter(fileContents);

         // orig フィールドを文字列に変換
        //  const origAsString = matterResult.orig ? matterResult.orig.toString() : '';

        //idとデータを返す
        return {
            id,
            ...matterResult.data,
            // orig: origAsString, // orig フィールドを文字列に変換
        }
    });
    return allPostsData; // データを返す

}

//getStaticPathsでreturnで使うpathを取得する
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName)=>{
        return{
            params:{
                id:fileName.replace(/\.md$/,"") //id名
            }
        }
    })
}

// [
//     {
//         params:{
//             id:"ssr-ssg"
//         }
//     },
//     {
//         params:{
//             id:"next-react"
//         }
//     },
// ]


//IDに基づいてブログ投稿データを返す
export async function getPostData(id){
    const fullPath = path.join(postsDirectory,`${id}.md`);
    const fileContent = fs.readFileSync(fullPath,'utf8');

    const matterResult = matter(fileContent);
    const blogContent = await remark().use(html).process(matterResult.content);
    const blogContentHTML = blogContent.toString();

    return{
        id,
        blogContentHTML,
        ...matterResult.data,
    }

}