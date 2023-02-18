import Drawer from "../Drawer"
import CommentsList from "./CommentsList"

const Comments = () => {
  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
        <Drawer />
        <CommentsList />
    </main>
  )
}

export default Comments