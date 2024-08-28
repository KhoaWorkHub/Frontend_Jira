import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {TrashIcon} from "@radix-ui/react-icons";
import {useDispatch} from "react-redux";
import {deleteComment} from "@/Redux/Comment/Action.js";

const CommentCard = ({item}) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        // dispatch(deleteComment({commentId: item.id}))
        dispatch(deleteComment(item.id))

    }
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <Avatar>
                    <AvatarFallback>{item.user.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <p>{item.user.fullName}</p>
                    <p>{item.content}</p>
                </div>
            </div>
            <Button onClick={handleDelete} className="rounded-full" variant="ghost" size="icon">
                <TrashIcon/>
            </Button>
        </div>
    );
};

export default CommentCard;