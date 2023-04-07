json.experience do
    json.extract! @experience, :id, :user_id, :title, :company, :location, :description, :start_month, :start_year, :end_month, :end_year, :skills, :logo
end