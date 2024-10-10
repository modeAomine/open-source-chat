import React, { useEffect, useState } from "react";
import { get_status_friend } from "../../../../../service/api";
import FriendsPanel from "../../FriendPanel";
import Chat from "../../../../Chat";

const FriendContainer = () => {
    const [pendingRequests, setPendingRequests] = useState([])
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const request = await get_status_friend()
                setPendingRequests(request)
                setFriends(request)
            } catch (error) {
                console.error(error.message)
            }
        };

        fetchPendingRequests()
    }, []);

    return (
        <div>
            <FriendsPanel friends={friends} pendingRequests={pendingRequests} />
            <Chat friends={friends} />
        </div>
    )
}