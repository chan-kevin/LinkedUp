json.like do
    json.extract! @like, :id, :likeable_id, :liker_id
end