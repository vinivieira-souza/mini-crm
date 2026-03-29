'use client';

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface TypingEffectProps {
    delay: number;
    isHistorical: boolean;
    onComplete?: () => void;
    children: React.ReactNode;
}

export function TypingEffect(props: TypingEffectProps) {
    const [isTyping, setIsTyping] = useState(!props.isHistorical)

    useEffect(() => {
        if (props.isHistorical) return;

        const timer = setTimeout(() => {
            setIsTyping(false)
            if (props.onComplete) props.onComplete();
        }, props.delay);

        return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.delay, props.isHistorical])

    return (
        isTyping ?
            <div className="flex gap-4 items-end animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Avatar>
                    <AvatarFallback className="bg-gray-900 text-gray-100">NV</AvatarFallback>
                </Avatar>
                <div className="bg-gray-50 p-4 rounded-2xl rounded-bl-none shadow-sm text-gray-700">
                    <div className="flex items-center">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
            </div> : <>{ props.children }</>
    )
}