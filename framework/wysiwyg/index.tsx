import React, {JSX} from "react";
import sanitizeHtml from "sanitize-html";
import {isEnvironment} from "../functions";
import "./index.css";

export function render(dangerousHtmlString: string): JSX.Element
{
    if (!isEnvironment("Web"))
    {
        throw new Error("Raw HTML, Markdown & WYSIWYG can only be used inside web environment");
    }

    const sanitizedHtmlString = sanitizeHtml(
        dangerousHtmlString,
        {
            allowedAttributes: {
                "*": ["class"]
            }
        }
    );

    return (
        <div
            className={"antimatter-html"}
            dangerouslySetInnerHTML={{__html: sanitizedHtmlString}}
        />
    );
}