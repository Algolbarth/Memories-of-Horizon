import type { System } from "$lib/system/class";
import type { Card } from "./class";

export class Effect {
    type: string;
    text: string = "";
    lines: any[] = [];
    card: Card;
    system: System;

    constructor(card: Card, lines: string[], condition: (() => boolean) | undefined, type: string) {
        for (const line of lines) {
            this.lines.push(this.parser(line));
            this.text = this.text + line;
        }
        this.card = card;
        this.system = card.system;
        if (condition != undefined) {
            this.condition = condition;
        }
        this.type = type;
    };

    condition = () => {
        return true;
    };

    parser = (input: string): any => {
        const parts: any[] = [];
        let i: number = 0;

        while (i < input.length) {
            if (input[i] === "[") {
                const name_match = input.slice(i).match(/^\[(\w+)\s*\{/);

                if (name_match) {
                    const block_type: string = name_match[1];
                    const start: number = i + name_match[0].length - 1;

                    let depth: number = 1;
                    let j: number = start + 1;

                    while (j < input.length && depth > 0) {
                        if (input[j] === "{") depth++;
                        else if (input[j] === "}") depth--;
                        j++;
                    }

                    const inside = input.slice(start + 1, j - 1);

                    const { arg, content } = splitArgs(inside);

                    parts.push({
                        type: block_type,
                        arg: arg,
                        children: this.parser(content)
                    });

                    i = input.indexOf("]", j) + 1;

                    continue;
                }
            }

            if (input[i] === "{") {
                let depth: number = 1;
                let j: number = i + 1;

                while (j < input.length && depth > 0) {
                    if (input[j] === "{") depth++;
                    else if (input[j] === "}") depth--;
                    j++;
                }

                if (depth === 0) {
                    const inside: string = input.slice(i + 1, j - 1);

                    const { key, value } = splitKeyValue(inside);

                    if (value && key != "variable") {
                        parts.push({
                            type: key,
                            children: this.parser(value)
                        });
                    }
                    else if (key === "variable") {
                        parts.push({
                            type: "variable",
                            value: value
                        });
                    }
                    else {
                        parts.push({
                            type: "variable",
                            value: key
                        });
                    }

                    i = j;

                    continue;
                }
            }

            let j = i;
            while (
                j < input.length &&
                input[j] !== "[" &&
                input[j] !== "{"
            ) {
                j++;
            }

            parts.push({
                type: "text",
                value: input.slice(i, j)
            });

            i = j;
        }

        return parts;
    };
};

function splitKeyValue(input: string): { key: string; value: string; } {
    let depth: number = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "{") {
            depth++;
        }
        else if (input[i] === "}") {
            depth--;
        }
        else if (input[i] === ":" && depth === 0) {
            return {
                key: input.slice(0, i).trim(),
                value: input.slice(i + 1).trim()
            };
        }
    }

    return { key: input.trim(), value: "" };
};

function splitArgs(input: string): { arg?: string; content: string; } {
    let depth: number = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === "{") {
            depth++;
        }
        else if (input[i] === "}") {
            depth--;
        }
        else if (input[i] === "," && depth === 0) {
            return {
                arg: input.slice(0, i).trim(),
                content: input.slice(i + 1).trim()
            };
        }
    }

    return {
        content: input.trim()
    };
};