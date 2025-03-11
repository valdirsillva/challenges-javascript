function getElementsByTag(root, tagName) {
    if (!root) []
    if (!tagName) return [root]

    let result = []

    // If results is a tag we´re looking for
    if (root.tagName.toLowerCase() === tagName.toLowerCase()) {
        result.push(root);
    }

    if (root.hasChildNodes()) {
        for (let child of root.children) {
            result = result.concat(getElementsByTag(child, tagName));
        }
    }

    return result
}

module.exports = getElementsByTag