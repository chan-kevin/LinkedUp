json.education do
    json.extract! @education, :id, :user_id, :school, :degree, :start_month, :start_year, :end_month, :end_year
end