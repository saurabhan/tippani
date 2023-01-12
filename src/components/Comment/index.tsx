import React, { useEffect, useReducer, useState } from 'react'

type Props = {}

interface commentPos {
  position: { x: number, y: number },
  id: string,
  comment: string,
}

interface Comment {
  id: string;
  value: string;
  position: {
    x: number;
    y: number;
  };
  resolved: boolean;
}

interface User {
  id: string;
  name: string;
  color: string;
  comments: Comment[];
}

interface Users {
  users: User[];
}

interface State {
  users: User[];
  currentUserId: string | null;
}

interface Action {
  type: 'addComment' | 'deleteComment';
  payload: {
    comment: Comment;
    userId?: string;
  };
}

// function commentReducer(state: State, action: Action) {
//   switch (action.type) {
//     case 'addComment': {
//       console.log("clicked")
//       const { comment, userId = state.currentUserId } = action.payload;
//       if (!userId) {
//         return state;
//       }
//       const users = state.users.map((user) => {
//         if (user.id === userId) {
//           return { ...user, comments: [...user.comments, comment] };
//         }
//         return user;
//       });
//       return { ...state, users };
//     }
//     case 'deleteComment': {
//       const { comment, userId = state.currentUserId } = action.payload;
//       if (!userId) {
//         return state;
//       }
//       const users = state.users.map((user) => {
//         if (user.id === userId) {
//           return {
//             ...user,
//             comments: user.comments.filter((c) => c.id !== comment.id),
//           };
//         }
//         return user;
//       });
//       return { ...state, users };
//     }
//     default:
//       return state;
//   }
// }

function commentReducer(state: State, action: Action) {
  switch (action.type) {
    case 'addComment': {
      let { comment, userId = state.currentUserId } = action.payload;
      if (!userId) {
        return state;
      }
      // Check if the comment with the same id and position already exists
      let user = state.users.find((u) => u.id === userId);
      if (!user) {
        // If the user is not found, create a new user object with the provided id
        user = { id: userId, name: '', color: '', comments: [] };
        // Add the new user to the state
        state.users = [...state.users, user];
      } else {
        let existingComment = user.comments.find(c => c.id === comment.id && c.position.x === comment.position.x && c.position.y === comment.position.y);
        if (existingComment) {
          // update the existing comment with new value
          existingComment.value = comment.value;
          return { ...state, users: [...state.users] };
        }
      }
      // Add the comment to the user's comments array
      user.comments = [...user.comments, comment];
      return { ...state, users: [...state.users] };
    }


    case 'deleteComment': {
      const { comment, userId = state.currentUserId } = action.payload;
      if (!userId) {
        return state;
      }
      const users = state.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            comments: user.comments.filter((c) => c.id !== comment.id),
          };
        }
        return user;
      });
      return { ...state, users };
    }
    default:
      return state;
  }
}

const Comment = (props: Props) => {
  const [mPos, setMPos] = useState<{ x: number; y: number; }>({ x: 0, y: 0 })
  const [state, dispatch] = useReducer(commentReducer, { users: [], currentUserId: "1" });
  const [commentPos, setCommentPos] = useState<commentPos[]>([{
    id: "1",
    comment: "hello",
    position: { x: 0, y: 0 }

  }])
  const [toggleComment, setToggleComment] = useState<Boolean>(false)
  const [createComment, setCreateComment] = useState<Boolean>(false)
  console.log(state)
  const handleCreateComment = (e: MouseEvent) => {
    const x = e.pageX
    const y = e.pageY
    const comment: Comment = {
      id: crypto.randomUUID(),
      position: { x, y },
      value: "",
      resolved: false
    }
    dispatch({ type: 'addComment', payload: { comment } });
    // setCommentPos(prev => prev.concat({
    //   id: crypto.randomUUID(),
    //   comment: "main",
    //   position: { x, y }
    // }))
    handleToggleComment()
    // setToggleComment(false)

  }
  console.log(toggleComment)

  const handleToggleComment = () => {
    setToggleComment(!toggleComment);

  }
  console.log(commentPos)

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setToggleComment(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [toggleComment])
  useEffect(() => {
    if (toggleComment) {
      document.body.style.cursor = 'crosshair';
      // <Cursorpointer/>
      setTimeout(() => {
        document.addEventListener('click', handleCreateComment);
      }, 100);
    } else {
      document.body.style.cursor = 'default';
      document.removeEventListener('click', handleCreateComment);
    }

    return () => document.removeEventListener('click', handleCreateComment)
  }, [toggleComment])

  return (
    <>
      <div >
        <div className='fixed flex items-center space-x-2 bottom-2 left-4 px-4 py-3 text-white  rounded-full bg-gray-700 '>
          <div onClick={handleToggleComment} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800">
            Comment
          </div>
          <div className="flex -space-x-2">
            <img className="inline-block h-[1.875rem] w-[1.875rem] rounded-full ring-4 ring-blue-500" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="avaatr" />
            <img className="inline-block h-[1.875rem] w-[1.875rem] rounded-full ring-4 ring-green-500" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="avaatr" />
            <img className="inline-block h-[1.875rem] w-[1.875rem] rounded-full ring-4 ring-amber-500" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="avaatr" />
            <img className="inline-block h-[1.875rem] w-[1.875rem] rounded-full ring-4 ring-red-500" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="avaatr" />

          </div>
          <div className='pl-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>

          </div>
        </div>
        {
          state.users?.map(user => {
            return user.comments?.map(comment => (
              <CommentIcon key={comment.id} setComment={dispatch} comment={comment} />
            )
            )
          })
        }
      </div>
    </>
  )
}

// function Cursorpointer() {
//   return (
//     <div className={`absolute pointer-events-none cursor-none font-semibold text-white bg-slate-600 rounded-full p-2 w-max ${toggleComment ? "block" : "hidden"} `} style={{ left: `${mPos.x}px`, top: `${mPos.y}px` }}>
//       +
//     </div>
//   )
// }

function AddComment({ comment, setComment }: { comment: Comment, setComment: React.Dispatch<Action> }) {
  const [value, setValue] = useState("")


  console.log(comment)
  const addnewcom = () => {
    const payload: Comment = {
      id: comment.id,
      position: comment.position,
      resolved: comment.resolved,
      value,
    }
    setComment({ type: 'addComment', payload: { comment: payload } });
    setValue("")
  }

  return (
    <div className="flex w-max flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <div className="p-4 md:p-5">
        {/* <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Card title
        </h3> */}
        <p className="mt-2 w-80 text-gray-800 dark:text-gray-400">
          {comment.value}
        </p>
        <textarea onChange={(e) => setValue(e.target.value)} className="py-3 mt-2 px-4 block w-full border-gray-400 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" rows={3} placeholder="Add Comment" value={value}></textarea>
        <button onClick={addnewcom} type="button" className="py-2 px-3 mt-2 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
          Add
        </button>
      </div>
      <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-gray-800 dark:border-gray-700">
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
          Last updated 5 mins ago
        </p>
      </div>
    </div>
  )
}

function CommentIcon({ comment, setComment }: { comment: Comment, setComment: React.Dispatch<Action> }) {
  const [open, setOpen] = useState<boolean>(false)
  console.log(setComment)
  console.log(comment)
  return (
    <>

      <div className='absolute' style={{ left: `${comment.position?.x}px`, top: `${comment.position?.y}px` }}>
        <img onClick={() => setOpen(!open)} className="inline-block h-[1.875rem] w-[1.875rem] rounded-tl-none rounded-full ring-4 ring-blue-500" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="avaatr" />

        <div className={`${open ? "" : "hidden"}  w-full overflow-hidden transition-[height] duration-300`} aria-labelledby="hs-basic-collapse">
          <div className="mt-5">
            <p className="text-gray-500 dark:text-gray-400">
              <AddComment setComment={setComment} comment={comment} />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment