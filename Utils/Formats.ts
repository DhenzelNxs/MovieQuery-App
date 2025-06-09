function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    let result = "";
    if (hours > 0) {
        result += `${hours}h`;
    }
    if (mins > 0) {
        result += `${mins}min`;
    }

    return result || "0min";
}

export {
    formatDuration,
}