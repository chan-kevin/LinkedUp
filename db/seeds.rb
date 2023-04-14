require "open-uri"
# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Experience.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('experiences')
  
    puts "Creating users..."
    puts "Creating experiences..."
    # Create one user with an easy to remember username, email, and password:
    
    user1 = User.create!(
      phone_number: '+123456789', 
      email: 'demo@user.io', 
      first_name: 'Demo',
      last_name: 'User',
      headline: 'full stack developer looking for opportunity',
      password: 'password',
      about: "As a passionate full stack developer, I have extensive knowledge of React, Redux, JavaScript, CSS, HTML, Ruby, and Canvas, 
      gained through online courses and personal projects.I'm eager to join a team where I can contribute my skills and continue to learn from experienced developers."
    )

    user2 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: 'Tim',
      last_name: 'Cook',
      headline: 'CEO of Apple | Leading Innovation in Technology',
      password: 'password',
      about: "Experienced CEO with a proven track record of driving innovation and growth in the tech industry. 
      Passionate about sustainability and social responsibility. 
      Leading Apple to new heights with a focus on creating innovative products that empower people to do amazing things."
    )

    user3 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: 'Bill',
      last_name: 'Gate',
      headline: 'Technology innovator and philanthropist',
      password: 'password',
      about: "a renowned technology innovator and co-founder of Microsoft, 
      solving some of the world's biggest problems through philanthropic work with the Bill & Melinda Gates Foundation."
    )

    user4 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: 'Bill',
      last_name: 'Gate',
      headline: 'Technology innovator and philanthropist',
      password: 'password',
      about: "a renowned technology innovator and co-founder of Microsoft, 
      solving some of the world's biggest problems through philanthropic work with the Bill & Melinda Gates Foundation."
    )

    user5 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: 'Elon',
      last_name: 'Musk',
      headline: 'Technology innovator and philanthropist',
      password: 'password',
      about: "As CEO of Tesla, SpaceX, and Neuralink, I am passionate about creating sustainable solutions for a better future. 
      With a focus on innovation and cutting-edge technology, I strive to push the boundaries and inspire others to do the same."
    )

    user6 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: 'Mark',
      last_name: 'Zuckerberg',
      headline: 'Connecting people and building the future',
      password: 'password',
      about: "As the co-founder and CEO of Facebook, I am passionate about creating technology that brings people together and 
      fosters meaningful connections. With a focus on innovation and social impact, I strive to build a better world through the power of technology."
    )

    user7 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: 'Harry',
      last_name: 'Potter',
      headline: 'Magical Wizard with a Passion for Adventure',
      password: 'password',
      about: "a skilled wizard with a thirst for adventure and a deep commitment to protecting the magical world. My experience battling dark forces 
      has honed my skills in problem-solving, leadership, and teamwork. I'm seeking opportunities to use my talents to make a positive impact and 
      continue my journey of growth and discovery."
    )

    user8 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: 'Naruto',
      last_name: 'Uzumaki',
      headline: 'Driven to Become Hokage',
      password: 'password',
      about: "Determined ninja with an unbreakable will to become Hokage. A master of ninjutsu, taijutsu, and genjutsu, I am always eager to learn and grow as a ninja. 
      Let's train together and become stronger!"
    )

    user9 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: 'Gon',
      last_name: 'Freecss',
      headline: "Young Hunter Seeking Father's Trail",
      password: 'password',
      about: "Gon is a determined young hunter on a mission to find his father and uncover the secrets of the Hunter Association. 
      With his natural talent and adventurous spirit, he faces challenges head-on and makes new friends along the way."
    )
  
    # More users
    # phone_numbers = []
    20.times do 
        # phone_number = Faker::PhoneNumber.cell_phone_in_e164
        # while phone_numbers.include?(phone_number)
        #     phone_number = Faker::PhoneNumber.cell_phone_in_e164
        # end
        # phone_numbers << phone_number
    
        # puts "Generated phone number: #{phone_number}"
    
        User.create!({
            phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164,
            email: Faker::Internet.unique.email,
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            headline: 'student @ app academy',
            about: Faker::Quote.matz,
            location: Faker::Address.country,
            password: 'password'
        }) 
    end

    months = ["January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"]

    i = 1
    while i < 22 do
      5.times do 
        start_year = rand(1990..2020)
        end_year = rand(start_year+1..2022)

        skills = '';
        3.times do 
          skills += + Faker::Job.key_skill + ' · '
        end

        Experience.create!({
          title: Faker::Job.unique.title,
          company: Faker::Company.unique.name,
          description: Faker::Company.unique.bs,
          start_month: months[rand(months.length)],
          start_year: start_year,
          user_id: i,
          location: Faker::Address.unique.country,
          end_month: months[rand(months.length)],
          end_year: end_year,
          skills: skills,
          logo: Faker::Company.logo
        })
      end

      education_start_year = rand(1980..2018)
      education_end_year = education_start_year + 4

      Education.create!({
        school: Faker::Educator.unique.university,
        degree: Faker::Educator.degree,
        user_id: i,
        start_month: months[rand(months.length)],
        start_year: education_start_year,
        end_month: months[rand(months.length)],
        end_year: education_end_year
      })
      i += 1
    end

    Post.create!({
      body: 'testing testing123!@^&*;',
      author_id: 1
    })

    Post.create!({
      body: '2testing2 2testing123!@^&*2;',
      author_id: 2
    })

    Post.first.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/cat.jpg"),
    filename: "cat.jpg"
    )
  
    puts "Done!"
  # end