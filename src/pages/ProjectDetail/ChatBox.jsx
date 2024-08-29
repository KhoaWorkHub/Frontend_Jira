import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getChatByProject, getChatMessage, sendMessage} from "@/Redux/Chat/Action.js";
import {useParams} from "react-router-dom";


const ChatBox = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {auth, chat} = useSelector(store => store);
    const {projectId} = useParams();
    const handleSendMessage = () => {
        dispatch(sendMessage({
            senderId: auth.user.id,
            projectId: projectId,
            content: message
        }))
        setMessage("");
        console.log("message", message);
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    // useEffect(() => {
    //     dispatch(getChatByProject(projectId))
    // }, [projectId]) // Sử dụng projectId làm dependency để tránh re-render không cần thiết.

    // useEffect(() => {
    //     if (chat?.id) {
    //         dispatch(getChatMessage(chat.id)) // Chỉ dispatch getChatMessage khi chat đã được load
    //     }
    // }, [chat?.id]) // Sử dụng chat.id làm dependency để gọi API lấy messages khi chat được load.


    useEffect(() => {
        dispatch(getChatByProject(projectId));
    }, [projectId, dispatch]);
 
    useEffect(() => {
        console.log("Chat state:", chat); // Log the chat state
        if (chat?.id) {
            dispatch(getChatMessage(chat.id));
        }
    }, [chat, dispatch]);
    return (
        <div className="sticky">
            <div className="border rounded-lg">
                <h1 className="border-b p-5">Chat Box</h1>
                <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
                    {chat.messages?.map((item) =>
                        item.sender.id !== auth.user.id ? <div className="flex gap-2 mb-2 justify-start" key={item.id}>
                                <Avatar>
                                    <AvatarFallback>K</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                                    <p>{item.sender.fullName}</p>
                                    <p className="text-gray-300">{item.content}</p>
                                </div>
                            </div> :
                            <div className="flex gap-2 mb-2 justify-end" key={item}>
                                <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                                    <p>{item.sender.fullName}</p>
                                    <p className="text-gray-300">{item.content}</p>
                                </div>
                                <Avatar>
                                    <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                                </Avatar>
                            </div>)}
                </ScrollArea>
                <div className="relative p-0">
                    <Input
                        placeholder="type message..."
                        className="py-7 border-t outline-non focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
                        value={message} onChange = {handleMessageChange}/>
                    <Button onClick = {handleSendMessage} className="absolute right-2 top-3 rounded-full" size="icon" variant="ghost">
                        <PaperPlaneIcon/>
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default ChatBox;