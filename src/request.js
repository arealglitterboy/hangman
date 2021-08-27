'use strict';

export default async (wordCount) => {
    const response = await fetch(`http://puzzle.mead.io/puzzle${wordCount ? '?wordCount=' + wordCount : ''}`);
    if (response.status !== 200) {
        throw new Error('An error occurred while getting puzzle');
    }

    const data = await response.json();
    return data.puzzle;
};