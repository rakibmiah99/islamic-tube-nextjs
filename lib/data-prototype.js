export function VideoInfoProtoType(videoInfo){
    return {
        title: videoInfo?.title,
        slug: videoInfo?.slug,
        description: videoInfo?.description,
        long_description: videoInfo?.long_description,
        published_at: videoInfo?.published_at,
        watch_count: videoInfo?.watch_count,
        likes_count: videoInfo?.likes_count,
        comments_count: videoInfo.comments_count,
        like: videoInfo.like,
        dislike: videoInfo.dislike,
        thumbnail: videoInfo?.thumbnail,
    }
}

export function RelatedVideoProtoType(video){
    return {
        title: video.title,
        slug: video.slug,
        thumbnail: video.thumbnail,
        watch_count: video.watch_count,
        published_at: video.published_at,
    }
}

export function CommentProtoType(comment){
    return {
        id: comment.id,
        body: comment.body,
        user: {
            name: comment.user.name,
        }
    }
}