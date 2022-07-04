import { gql, useQuery } from '@apollo/client';
import { Lesson } from './Lesson'



const GET_LESSONS_QUERY = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      lessonType
      availableAt
      title
      slug
    }
  }
`

interface GetLessonsQueryResponse //tipagem que diz qual o retorno da GET_LESSONS_QUERY
{lessons: {
  id:string
  title: string
  slug: string
  availableAt: string
  lessonType: "live" | "class"
}[]}

export function Sidebar() {
const { data } = useQuery<GetLessonsQueryResponse>(GET_LESSONS_QUERY);


  return (
    <aside className="w-1/4 bg-gray-700 p-6 border-l border-gray-600 hidden md:block">
      <span className="font-bold text-2xl justify-center pb-6 mb-6 border-b border-gray-500 block">
        Lessons
      </span>
      <div className=" flex flex-col gap-8">
        {data?.lessons.map((lesson) => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonType}
            />
          );
        })}
      </div>
    </aside>
  );
}
