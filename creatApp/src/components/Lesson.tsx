import {CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from "date-fns/locale/pt-BR";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import classnames from "classnames"


interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string}>()

  const isAvailable= isPast(props.availableAt);
  const availableDateFormatted = format(
    props.availableAt,
    "M' • 'd ' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );

    const isActiveLesson = slug === props.slug // to change the css of the sidebar lessons

  return (
    <div>
      <Link to={`/event/lesson/${props.slug}`} className="group">
        <span className="text-gray-300">{availableDateFormatted}</span>

        <div
          className={classnames(
            "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors",
            {
              "bg-green-500": isActiveLesson,
            }
          )}
        >
          <header className=" flex items-center justify-between">
            {isAvailable ? (
              <span
                className={classnames(
                  " text-sm text-blue-500 font-medium flex items-center gap-2",
                  {
                    "text-white": isActiveLesson,
                  }
                )}
              >
                <CheckCircle size={20} />
                Released Content
              </span>
            ) : (
              <span className=" text-sm text-orange-500 font-medium flex items-center gap-2">
                <Lock size={20} />
                Soon
              </span>
            )}
            <span
              className={classnames("text-xs rounded py-[0.125] px-2 text-white border border-green-300 font-bold", {
                "text-white border-white": isActiveLesson,
              })}
            >
              {props.type === "live" ? "LIVE" : "RECORDED"}
            </span>
          </header>

          <strong
            className={classnames("text-gray-200 mt-5 block", {
              "text-white": isActiveLesson,
            })}
          >
            {props.title}
          </strong>
        </div>
      </Link>
    </div>
  );}
