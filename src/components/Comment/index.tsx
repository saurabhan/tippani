import React, { useEffect, useState } from 'react'

type Props = {}

interface commentPos {
  position: { x: Number, y: Number },
  id: string,
  comment: string,
}

const Comment = (props: Props) => {
  const [mPos, setMPos] = useState<{ x: number; y: number; }>({ x: 0, y: 0 })
  const [commentPos, setCommentPos] = useState<commentPos[]>([{
    id: "1",
    comment: "hello",
    position: { x: 0, y: 0 }

  }])
  const [toggleComment, setToggleComment] = useState<Boolean>(false)
  const [createComment, setCreateComment] = useState<Boolean>(false)

  const handleCreateComment = (e: MouseEvent) => {
    const x = e.pageX
    const y = e.pageY
    setCommentPos(prev => prev.concat({
      id: crypto.randomUUID(),
      comment: "hello",
      position: { x, y }

    }))
    handleToggleComment()
    // setToggleComment(false)

  }
  console.log(toggleComment)

  const handleToggleComment = () => {
    setToggleComment(!toggleComment);
   
  }
  console.log(commentPos)

  useEffect(()=>{
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setToggleComment(false);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  },[toggleComment])
  useEffect(() => {
    if (toggleComment) {
      document.body.style.cursor = 'crosshair';
      setTimeout(() => {
        document.addEventListener('click', handleCreateComment);
      }, 100);
    } else {
      document.body.style.cursor = 'default';
      document.removeEventListener('click', handleCreateComment);
    }

    return () => document.removeEventListener('click', handleCreateComment)
  },[toggleComment])

  return (
    <div >
      <div onClick={handleToggleComment} className='absolute bottom-2 left-4 p-5 rounded-full bg-gray-400'>
        Comment
      </div>
      <div className={`absolute pointer-events-none cursor-none font-semibold text-white bg-slate-600 rounded-full p-2 w-max ${toggleComment ? "block" : "hidden"} `} style={{ left: `${mPos.x}px`, top: `${mPos.y}px` }}>
        +
      </div>
      {
        commentPos.map(item => (
          <div key={item.id} className="absolute p-2 bg-red-400 rounded-full" style={{ left: `${item.position.x}px`, top: `${item.position.y}px` }}>
            X
          </div>
        ))
      }
    </div>
  )
}

export default Comment