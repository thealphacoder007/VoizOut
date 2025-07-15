export const validatePostExperienceData = (req) => {
    const companyName = req.body.companyName;
    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;

    if (!companyName || !title || !description || !type) {
        throw new Error("You must provide all the required information of your experience")
    }

    return {
        companyName,
        title,
        description,
        type
    }
}

export const sendExperienceData = (savedExperience) => {
    const { _id, type, isAnonymous, title, description, companyName } = savedExperience

    const toSendExperienceData = {
        type, title, description, companyName, _id
    }

    if (!isAnonymous) {
        toSendExperienceData.author = savedExperience.author
    }

    return toSendExperienceData
}