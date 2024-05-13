import Card from './modul';
import { AddCard } from './add_modul';

interface data {
    "id": string | null,
    "createdAt": string | null,
    "updatedAt": string | null,
    "titleUz": string | null,
    "titleRu": string | null,
    "descriptionUz": string | null,
    "descriptionRu": string | null,
    "courseId": string | null
}
interface Response {
    "id": string,
    "createdAt": string,
    "updatedAt": string,
    "titleUz": string,
    "titleRu": string,
    "image": string,
    "descriptionUz": string,
    "descriptionRu": string,
    "courseStatus": string,
    "myCoursesId": null,
    "Module": [
        {
            "id": string | null,
            "createdAt": string | null,
            "updatedAt": string | null,
            "titleUz": string | null,
            "titleRu": string | null,
            "descriptionUz": string | null,
            "descriptionRu": string | null,
            "courseId": string | null
        }

    ]
}

async function getData<T>(id: string): Promise<T | Error> {
    const res = await fetch(`https://oar-api.onrender.com/api/v1/courses/single/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return new Error("Failed to fetch data");
    }

    return res.json();
}
const AddModul = async ({courseId}: {courseId: string}): Promise<JSX.Element> => {
    const response = await getData<Response>(courseId);
    if (response instanceof Error) {
        return <h2>Failed to fetch data.</h2>;
    }
    return (
        <div>
            <h1 className='text-[26px] leading-[36px] text-[#5A7A2E] mb-4'>{ response.titleUz}</h1>
            <div className='flex flex-wrap'>
                {response.Module.map((data: data, id: number) => (<Card key={id} bacData={data} id={id} />))}
                <AddCard id={courseId} />
            </div>
        </div>


    )
}

export default AddModul

