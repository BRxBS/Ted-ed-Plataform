import { DefaultUi, Player,Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Lightning, Image } from "phosphor-react";
import { gql, useQuery } from "@apollo/client";

import '@vime/core/themes/default.css';

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      videoId
      title
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`
interface GetLessonBySlugResponse{
    lesson: {
      videoId: string;
      title: string;
      description: string;
      teacher: {
        bio: string;
        avatarURL: string;
        name: string;
}}}

interface VideoProps{
  lessonSlug: string;
}



export function Video(props: VideoProps) {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: props.lessonSlug,
    },
  });


      if (!data) {
        return(
          <div className="flex-1">
            <p>carregando...</p>
          </div>
        )
      }

  return (
    <div className="flex-1 ">
      <div className="md:block">
        <div className="bg-black flex justify-center">
          <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
            <Player>
              <Youtube videoId={data.lesson.videoId} />
              <DefaultUi />
            </Player>
          </div>
        </div>

        <div className="p-8 max-w[1100px] mx=auto ">
          <div className="block items-start gap-16 md:flex">
            <div className="flex-1 ">
              <h1 className="block text-2xl font-bold md:flex">
                {data.lesson.title}
              </h1>
              <p className="block mt-4 text-gray-200 leading-relaxed md:flex">
                {data.lesson.description}
              </p>

              <div className="flex items-center gap-4 mt-6">
                <img
                  className="h-16 w-16 rounded-full border-2 border-blue-500"
                  src={data.lesson.teacher.avatarURL}
                  alt="Foto do professor"
                />

                <div>
                  <strong className="font-bold text-2xl block">
                    {data.lesson.teacher.name}
                  </strong>
                  <span className="text-gray-200 text-sm block">
                    {data.lesson.teacher.bio}
                  </span>
                </div>
              </div>
            </div>

            <div className="block flex-col gap-4 md:flex">
              <a
                href=""
                className="mt-4 md:mt-0 p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
              >
                <DiscordLogo size={24} />
                Discord Community
              </a>

              <a
                href=""
                className="mt-4 md:mt-0 p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors"
              >
                <Lightning size={24} />
                Challenges
              </a>
            </div>
          </div>

          <div className=" gap-8 mt-20 grid grid-rows-2 md:flex">
            <a
              href=""
              className="w-full h-ms bg-gray-700 rounded overflow-hidden flex items-stretch gap-2 md:gap-6 hover:bg-gray-600 transition-colors"
            >
              <div className="bg-green-700 h-full p-6 flex items-center">
                <FileArrowDown size={48} />
              </div>
              <div className="py-2 md:py-6 leading-relaxed">
                <strong className="text-md md:text-2xl">
                  Complementary
                </strong>
                <p className="block md-flex text-sm text-gray-200 mt-2">
                  Access the supplemental material to accelerate your development.
                </p>
              </div>

              <div className="h-full p-6 flex items-center">
                <CaretRight size={24} />
              </div>
            </a>

            <a
              href=""
              className="w-full h-ms bg-gray-700 rounded overflow-hidden flex items-stretch gap-2 md:gap-6 hover:bg-gray-600 transition-colors"
            >
              <div className="bg-green-700 h-full p-6 flex items-center">
                <Image size={48} />
              </div>
              <div className="py-2 md:py-6 leading-relaxed">
                <strong className="text-md md:text-2xl">
                  Exclusive Wallpapers
                </strong>
                <p className="block md-flex text-sm text-gray-200 mt-2">
                  Download exclusive wallpapers and customize your screens.
                </p>
              </div>

              <div className="h-full p-6 flex items-center">
                <CaretRight size={24} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
