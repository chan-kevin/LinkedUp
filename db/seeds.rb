require "open-uri"
# require 'httparty'
# require 'dotenv/load'

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
    # def fetch_company_logo(company)
    #   response = HTTParty.get("https://company.clearbit.com/v1/domains/find?name=#{company}",
    #     headers: { Authorization: "Bearer #{ENV['CLEARBIT_API_KEY']}" })
  
    #   data = JSON.parse(response.body)
    #   @logo = data["logo"]
    # end
    
    user1 = User.create!(
      phone_number: '+123456789', 
      email: 'demo@user.io', 
      first_name: 'Kevin',
      last_name: 'Demo',
      headline: 'Fullstack Software Engineer JavaScript | React.js | Redux | Ruby | Ruby on Rails',
      password: 'password',
      location: 'New York, New York, United States',
      about: "As a passionate full stack developer, I have extensive knowledge of React, Redux, JavaScript, CSS, HTML, Ruby, and Canvas, 
      gained through online courses and personal projects.I'm eager to join a team where I can contribute my skills and continue to learn from experienced developers."
    )

    user2 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'Squidward@user.io', 
      first_name: 'Squidward',
      last_name: 'Tentacles',
      headline: 'Creative Problem Solver | Team Player',
      password: 'password',
      location: '122 Conch Street',
      about: "Experienced musician with a passion for the arts, seeking opportunities to showcase my skills and grow as an artist. 
      Able to work independently or as part of a team, with a strong focus on quality and attention to detail."
    )

    user3 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'yor@user.io', 
      first_name: 'Yor',
      last_name: 'Forger',
      headline: 'Ordinary Clerk at Berlint City Hall',
      password: 'password',
      location: 'Ostania',
      about: "I don't need to be at peace. I don't care if I have to bloody my hands. Even if it means living a life that could end at any moment... 
      Even if it means having to leave the Forger family... I think Loid would respect that. He would understand. That's why I won't give up this fight!"
    )

    user4 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'loid@user.io', 
      first_name: 'Loid',
      last_name: 'Forger',
      headline: 'Spy',
      password: 'password',
      location: 'Ostania',
      about: "Not fit to be a spy? No. The mistake was endangering that child in the first place. How did I not see that? Making a world where kids don't need to cry... 
      That was the whole reason... I became a spy in the first place."
    )

    user5 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'ted@user.io', 
      first_name: 'Ted',
      last_name: 'Mosby',
      headline: 'Innovative Architect | Building Better Communities',
      password: 'password',
      location: 'New York, New York, United States',
      about: "Passionate and skilled architect with expertise in sustainable design and project management. Dedicated to creating spaces that inspire and improve the lives of individuals and communities."
    )

    user6 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'gary@user.io', 
      first_name: 'Gary',
      last_name: 'The Snail',
      headline: 'Meow',
      password: 'password',
      location: 'pineapple house',
      about: "Meow"
    )

    user7 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'harry@user.io', 
      first_name: 'Harry',
      last_name: 'Potter',
      headline: 'Magical Wizard with a Passion for Adventure',
      password: 'password',
      location: 'United Kingdom',
      about: "a skilled wizard with a thirst for adventure and a deep commitment to protecting the magical world. My experience battling dark forces 
      has honed my skills in problem-solving, leadership, and teamwork. I'm seeking opportunities to use my talents to make a positive impact and 
      continue my journey of growth and discovery."
    )

    user8 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'naruto@userio', 
      first_name: 'Naruto',
      last_name: 'Uzumaki',
      headline: 'Driven to Become Hokage',
      password: 'password',
      location: 'Konohagakure (Hidden Leaf Village)',
      about: "Determined ninja with an unbreakable will to become Hokage. A master of ninjutsu, taijutsu, and genjutsu, I am always eager to learn and grow as a ninja. 
      Let's train together and become stronger!"
    )

    user9 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'gon@user.io', 
      first_name: 'Gon',
      last_name: 'Freecss',
      headline: "Young Hunter Seeking Father's Trail",
      password: 'password',
      location: 'Hunter',
      about: "Gon is a determined young hunter on a mission to find his father and uncover the secrets of the Hunter Association. 
      With his natural talent and adventurous spirit, he faces challenges head-on and makes new friends along the way."
    )

    user10 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'tony@user.io', 
      first_name: 'Tony',
      last_name: 'Stark',
      headline: "Genius Inventor and Avenger",
      password: 'password',
      location: 'Manhattan, New York, United States',
      about: "Tony Stark, aka Iron Man, is a brilliant inventor and billionaire playboy who fights for justice as a member of the Avengers. 
      He uses his high-tech suit to take on threats to humanity, while navigating his own personal demons."
    )

    user11 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'spongebob@user.io', 
      first_name: 'Spongebob',
      last_name: 'SquarePants',
      headline: "Optimistic Sea Sponge",
      password: 'password',
      location: 'pineapple house',
      about: "SpongeBob SquarePants is an enthusiastic and optimistic sea sponge who loves his job as a fry cook at the Krusty Krab. 
      With his best friend Patrick by his side, he embarks on wacky adventures in the underwater city of Bikini Bottom."
    )

    user12 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'peter@user.io', 
      first_name: 'Peter',
      last_name: 'Parker',
      headline: "Amazing Spider-Man",
      password: 'password',
      location: 'Manhattan, New York, United States',
      about: "Peter Parker is a high school student with extraordinary spider-like abilities, fighting crime as the one and only Spider-Man. 
      He balances his superhero life with school and personal relationships, always striving to do what's right."
    )

    user13 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'anya@user.io', 
      first_name: 'Anya',
      last_name: 'Forger',
      headline: "Peanuts",
      password: 'password',
      location: 'Ostania',
      about: "hates carrots"
    )

    user14 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'gojo@user.io', 
      first_name: 'Gojo',
      last_name: 'Satoru',
      headline: "Jujutsu Sorcerer Extraordinaire",
      password: 'password',
      location: 'Tokyo',
      about: "Muryōkūsho"
    )

    user15 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'hermione@user.io', 
      first_name: 'Hermione',
      last_name: 'Granger',
      headline: "Analytical Thinker | Driving Impactful Change",
      password: 'password',
      location: 'England',
      about: "Experienced and detail-oriented professional with a passion for problem-solving and strategic thinking. 
      Skilled in research, analysis, and project management, with a strong focus on driving meaningful and positive change."
    )

    user16 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: 'daenerys@user.io', 
      first_name: 'Daenerys',
      last_name: 'Targaryen',
      headline: "Mother of Dragons",
      password: 'password',
      location: 'The island of Lokrum',
      about: "Daenerys Stormborn of House Targaryen, the First of Her Name, 
      Queen of the Andals and the First Men, Protector of the Seven Kingdoms, 
      the Mother of Dragons, the Khaleesi of the Great Grass Sea, the Unburnt, the Breaker of Chains."
    )

    user17 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      headline: "Data Analyst | Transforming Insights into Action",
      password: 'password',
      location: Faker::Address.country,
      about: "Detail-oriented data analyst with a passion for using insights to drive business decisions and growth."
    )

    user18 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      headline: "Creative Designer | Bringing Ideas to Life",
      password: 'password',
      location: Faker::Address.country,
      about: "Experienced creative designer skilled in turning ideas into stunning visual assets that captivate and engage audiences"
    )

    user19 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      headline: "Strategic Thinker | Driving Business Growth",
      password: 'password',
      location: Faker::Address.country,
      about: "Visionary leader with expertise in strategy, innovation, and business development. 
      Passionate about leveraging cutting-edge technologies to drive business growth and success."
    )

    user20 = User.create!(
      phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164, 
      email: Faker::Internet.unique.email, 
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      headline: "Creative Designer | Bringing Ideas to Life",
      password: 'password',
      location: Faker::Address.country,
      about: "Experienced creative designer skilled in turning ideas into 
      stunning visual assets that captivate and engage audiences."
    )

    months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"]

    Experience.create!({
      title: Faker::Job.unique.title,
      company: 'Sony',
      description: "- Collaborated with team members to develop and execute effective marketing campaigns.\n" \
      "- Conducted research and analysis to identify customer needs and preferences.\n" \
      "- Implemented new procedures to improve efficiency and productivity.",
      start_month: months[rand(months.length)],
      start_year: 2019,
      user_id: 1,
      end_month: months[rand(months.length)],
      end_year: 2022,
      location: Faker::Address.unique.country,
      # logo: fetch_company_logo('google')
      logo: Faker::Company.logo
    })

    Experience.create!({
      title: Faker::Job.unique.title,
      company: 'The New York Times',
      description: "- Managed a portfolio of clients and maintained strong relationships with key stakeholders.\n" \
      "- Utilized various software tools to analyze and interpret data and provide insights for decision-making.\n" \
      "- Developed and delivered presentations to internal and external audiences.",
      start_month: months[rand(months.length)],
      start_year: 2015,
      user_id: 1,
      location: Faker::Address.unique.country,
      end_month: months[rand(months.length)],
      end_year: 2018,
      # logo: fetch_company_logo('twitter')
      logo: Faker::Company.logo
    })

    Experience.create!({
      title: Faker::Job.unique.title,
      company: 'FaceBook',
      description: "- Managed a portfolio of clients and maintained strong relationships with key stakeholders.\n" \
      "- Utilized various software tools to analyze and interpret data and provide insights for decision-making.\n" \
      "- Developed and delivered presentations to internal and external audiences.",
      start_month: months[rand(months.length)],
      start_year: 2010,
      user_id: 1,
      location: Faker::Address.unique.country,
      end_month: months[rand(months.length)],
      end_year: 2014,
      # logo: fetch_company_logo('facebook')
      logo: Faker::Company.logo
    })

    Experience.create!({
      title: Faker::Job.unique.title,
      company: 'Adobe',
      description: "- Managed a portfolio of clients and maintained strong relationships with key stakeholders.\n" \
      "- Utilized various software tools to analyze and interpret data and provide insights for decision-making.\n" \
      "- Developed and delivered presentations to internal and external audiences.",
      start_month: months[rand(months.length)],
      start_year: 2005,
      user_id: 1,
      location: Faker::Address.unique.country,
      end_month: months[rand(months.length)],
      end_year: 2009,
      # logo: fetch_company_logo('adobe')
      logo: Faker::Company.logo
    })
  
    # More users
    # phone_numbers = []
    # 20.times do 
    #     # phone_number = Faker::PhoneNumber.cell_phone_in_e164
    #     # while phone_numbers.include?(phone_number)
    #     #     phone_number = Faker::PhoneNumber.cell_phone_in_e164
    #     # end
    #     # phone_numbers << phone_number
    
    #     # puts "Generated phone number: #{phone_number}"
    
    #     User.create!({
    #         phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164,
    #         email: Faker::Internet.unique.email,
    #         first_name: Faker::Name.first_name,
    #         last_name: Faker::Name.last_name,
    #         headline: 'student @ app academy',
    #         about: Faker::Quote.matz,
    #         location: Faker::Address.country,
    #         password: 'password'
    #     }) 
    # end

    # months = ["January", "February", "March", "April", "May", "June", 
    #       "July", "August", "September", "October", "November", "December"]

    education_start_year = rand(1980..2018)
    education_end_year = education_start_year + 4

    Education.create!({
      school: Faker::Educator.unique.university,
      degree: Faker::Educator.degree,
      user_id: 1,
      start_month: months[rand(months.length)],
      start_year: education_start_year,
      end_month: months[rand(months.length)],
      end_year: education_end_year
    })



    i = 2
    while i < 21 do
      5.times do 
        start_year = rand(2000..2017)
        end_year = rand(start_year+2..2022)

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

    post1 = Post.create!({
      body: 'first post',
      author_id: 1
    })

    post2 = Post.create!({
      body: "Excited to announce that our team has just launched a new product! 🚀 It's been months of hard work and dedication, but we're thrilled to see it come to life.",
      author_id: 2
    })

    # post2.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/Squidward.jpeg"),
    # filename: "Squidward.jpeg"
    # )

    post2.photo.attach( io: File.open(Rails.root.join("db", "assets", "congrats.gif")),
    filename: "congrats.gif"
    )

    Comment.create!({
      post_id: post2.id,
      commenter_id: user1.id,
      body: "Absolutely fantastic news! 🎉 Huge congratulations to you and your team on this remarkable achievement! Can't wait to see the amazing impact your new product will have! 🚀💫 "
    })

    Comment.create!({
      post_id: post2.id,
      commenter_id: user4.id,
      body: "What an incredible accomplishment! 🥳 The dedication and hard work truly paid off. Looking forward to experiencing the magic your new product brings! Congratulations to the entire team! 🌟🚀 "
    })

    Comment.create!({
      post_id: post2.id,
      commenter_id: user6.id,
      body: "Amazing news! Congratulations to the team!"
    })

    Comment.create!({
      post_id: post2.id,
      commenter_id: user9.id,
      body: "Wow, that's fantastic! Congrats on the launch!"
    })

    post3 = Post.create!({
      body: "🚀 Thrilled to share my incredible App Academy experience! From web development fundamentals to advanced coding techniques, it's been a life-changing journey." + "\n" + 
      "Grateful for the supportive community and top-notch curriculum. Highly recommend App Academy! 💻 ",
      author_id: 3
    })

    # post3.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/aa+101.png"),
    # filename: "aa101.jpg"
    # )

    post3.photo.attach( io: File.open(Rails.root.join("db", "assets", "aa+101.png")),
    filename: "aa101.jpg"
    )

    Comment.create!({
      post_id: post3.id,
      commenter_id: user12.id,
      body: "Impressive journey! 🚀 Congrats!"
    })

    Comment.create!({
      post_id: post3.id,
      commenter_id: user15.id,
      body: "Sounds amazing! 💡 Well done!"
    })

    Comment.create!({
      post_id: post3.id,
      commenter_id: user5.id,
      body: "Way to go! Your hard work paid off!"
    })

    post4 = Post.create!({
      body: "Git Commands🔥",
      author_id: 4
    })

    # post4.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/timeBlockinHR.jpg"),
    # filename: "HR.jpg"
    # )

    post4.photo.attach( io: File.open(Rails.root.join("db", "assets", "git_command.jpeg")),
    filename: "git_command.jpeg"
    )

    Comment.create!({
      post_id: post4.id,
      commenter_id: user2.id,
      body: "Love this cheat sheet! 🙌 Thanks for sharing!"
    })

    Comment.create!({
      post_id: post4.id,
      commenter_id: user8.id,
      body: "This is pure gold! Thanks for sharing the Git wisdom!"
    })

    Comment.create!({
      post_id: post4.id,
      commenter_id: user16.id,
      body: "Such a handy reference! 🚀 Git mastery in one glance!"
    })

    Comment.create!({
      post_id: post4.id,
      commenter_id: user7.id,
      body: "Git essentials in one pic! Saving this for quick reference!"
    })

    post5 = Post.create!({
      body: "Thrilled to announce my role at VivoTech Solutions as Senior Software Engineer! Ready to dive into exciting tech projects and embrace new opportunities." + "\n" + 
      "Grateful for the journey that led me here. Let's innovate together! 🚀👩‍💻",
      author_id: 13
    })

    # post4.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/timeBlockinHR.jpg"),
    # filename: "HR.jpg"
    # )

    post5.photo.attach( io: File.open(Rails.root.join("db", "assets", "congrats.gif")),
    filename: "congrats.gif"
    )


    Comment.create!({
      post_id: post5.id,
      commenter_id: user1.id,
      body: "This is fantastic news! Congratulations on your new position as Senior Software Engineer at VivoTech Solutions! Wishing you all the best in your exciting endeavors. 🚀👩‍💻"
    })

    Comment.create!({
      post_id: post5.id,
      commenter_id: user6.id,
      body: "Congratulations on the new role! 🎉 Exciting times ahead, and VivoTech Solutions is lucky to have you! 🚀💼"
    })

    Comment.create!({
      post_id: post5.id,
      commenter_id: user10.id,
      body: "What an exciting announcement! You're going to do great things at VivoTech Solutions. Congratulations on this well-deserved opportunity!"
    })

    post6 = Post.create!({
      body: "Just found a game that's good!🐌" + "\n" + 
      "The Adventures of Gary the Snail is a 2D interactive puzzle game where Gary the snail is lost underwater. The main objective of the game is to help Gary get to home to SpongeBob in Bikini Bottom." + "\n" +
      "- Use Patrick's house to change Gary's direction." + "\n" +
      "- Colliding with jellyfish results in a game over.",
      author_id: 10
    })

    # post6.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/gary.png"),
    # filename: "gary.jpg"
    # )

    post6.photo.attach( io: File.open(Rails.root.join("db", "assets", "gary.png")),
    filename: "gary.jpg"
    )

    Comment.create!({
      post_id: post6.id,
      commenter_id: user2.id,
      body: "I've heard about that game! It's a classic. Enjoy helping Gary find his way home!"
    })

    Comment.create!({
      post_id: post6.id,
      commenter_id: user5.id,
      body: "Gary's underwater adventure sounds intriguing! 🌊 I'll definitely check it out. Thanks for sharing!"
    })

    Comment.create!({
      post_id: post6.id,
      commenter_id: user9.id,
      body: "A game with a beloved character! 🌟 Can't wait to give it a try. Thanks for sharing!"
    })

    Comment.create!({
      post_id: post6.id,
      commenter_id: user1.id,
      body: "This brings back memories! Gary's adventure is a classic. Enjoy the game!"
    })


    post7 = Post.create!({
      body: "App Academy is a top-tier coding bootcamp known for its intensive curriculum, hands-on learning, and exceptional career outcomes. With a focus on practical skills and real-world projects, it prepares students for success in the software development industry." + "\n" + 
      "Its strong track record of placing graduates in prominent tech companies underscores its effectiveness in launching successful tech careers.",
      author_id: 6
    })

    # post7.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/aaCampus.png"),
    # filename: "aaCampus.jpg"
    # )

    post7.photo.attach( io: File.open(Rails.root.join("db", "assets", "aaCampus.png")),
    filename: "aaCampus.jpg"
    )

    Comment.create!({
      post_id: post7.id,
      commenter_id: user7.id,
      body: "That's impressive! App Academy sounds like an excellent choice for aspiring developers. Thanks for sharing this valuable information!"
    })

    Comment.create!({
      post_id: post7.id,
      commenter_id: user10.id,
      body: "I've been considering coding bootcamps, and App Academy looks like a top contender. Thanks for shedding light on their strong track record!"
    })

    post8 = Post.create!({
      body: "A big thank you to @Kevin Demo for giving me the opportunity to take on these new responsibilities at XYZ Company",
      author_id: 7
    })

    post8.photo.attach( io: File.open(Rails.root.join("db", "assets", "congrats.gif")),
    filename: "congrats.gif"
    )

    Comment.create!({
      post_id: post8.id,
      commenter_id: user1.id,
      body: "You're welcome! It's clear you'll excel in your new role at XYZ Company. Looking forward to seeing all the great things you'll accomplish!"
    })

    Comment.create!({
      post_id: post8.id,
      commenter_id: user14.id,
      body: "That's fantastic news! 🎉 Wishing you all the best in your new role at XYZ Company. They're lucky to have you!"
    })

    Comment.create!({
      post_id: post8.id,
      commenter_id: user3.id,
      body: "Such an exciting opportunity! 🌠 You're going to do great things at XYZ Company. Congratulations!"
    })

    post9 = Post.create!({
      body: "I am happy to share that I am starting a new position as Senior Associate, Private Equity!",
      author_id: 8
    })

    post9.photo.attach( io: File.open(Rails.root.join("db", "assets", "congrats.gif")),
    filename: "congrats.gif"
    )

    Comment.create!({
      post_id: post9.id,
      commenter_id: user3.id,
      body: "That's fantastic news! 🥳 Senior Associate in Private Equity is a significant achievement. Best of luck in your new role!"
    })

    Comment.create!({
      post_id: post9.id,
      commenter_id: user2.id,
      body: "Wow, that's amazing! Senior Associate in Private Equity is a big step. Wishing you success and fulfillment in this new position!"
    })

    Comment.create!({
      post_id: post9.id,
      commenter_id: user6.id,
      body: "What a milestone! 🚀 Your hard work has paid off. Congratulations on becoming Senior Associate in Private Equity!"
    })

    post10 = Post.create!({
      body: "A beautiful place to relax my day." + "\n" +
      "Location: Windermere, United Kingdom",
      author_id: 1
    })

    # post10.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/recursion.png"),
    # filename: "recursion.jpg"
    # )

    post10.photo.attach( io: File.open(Rails.root.join("db", "assets", "windermere.jpeg")),
    filename: "windermere.jpeg"
    )

    Comment.create!({
      post_id: post10.id,
      commenter_id: user9.id,
      body: "Absolutely breathtaking! 😍 Windermere looks like a slice of paradise. Enjoy your day of relaxation!"
    })

    Comment.create!({
      post_id: post10.id,
      commenter_id: user12.id,
      body: "What a serene view! Windermere is truly a gem. Wishing you a peaceful and rejuvenating time there!"
    })

    Comment.create!({
      post_id: post10.id,
      commenter_id: user4.id,
      body: "Nature at its finest! 🌳 Windermere looks like a dreamy escape. Thanks for sharing this tranquil moment!"
    })

    Comment.create!({
      post_id: post10.id,
      commenter_id: user13.id,
      body: "Wow, what a view! Windermere is indeed a beautiful place to unwind. Enjoy every moment!"
    })

    post11 = Post.create!({
      body: "CSS Border Radius 💡",
      author_id: 1
    })

    # post11.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/codeDoes.JPG"),
    # filename: "codedoes.jpg"
    # )

    post11.photo.attach( io: File.open(Rails.root.join("db", "assets", "css-border.jpeg")),
    filename: "css-border.jpeg"
    )

    Comment.create!({
      post_id: post11.id,
      commenter_id: user7.id,
      body: "Understanding and using CSS Border Radius effectively can make a huge difference in design. Great post!"
    })

    Comment.create!({
      post_id: post11.id,
      commenter_id: user6.id,
      body: "A crucial design element! CSS Border Radius can add depth and style to any layout. Thanks for the insightful post!"
    })

    post12 = Post.create!({
      body: "A wonderful splash page",
      author_id: 5
    })

    # post12.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/itWorks.webp"),
    # filename: "question.jpg"
    # )

    post12.photo.attach( io: File.open(Rails.root.join("db", "assets", "artifacts.gif")),
    filename: "artifacts.gif"
    )

    Comment.create!({
      post_id: post12.id,
      commenter_id: user1.id,
      body: "Love the design! 🚀 The splash page sets such an inviting tone."
    })

    Comment.create!({
      post_id: post12.id,
      commenter_id: user4.id,
      body: "Wow, this splash page is top-notch! It really grabs your attention."
    })

    Comment.create!({
      post_id: post12.id,
      commenter_id: user8.id,
      body: "Absolutely stunning! 🌟 The splash page looks so inviting and beautifully designed."
    })

    post13 = Post.create!({
      body: "Thrilled to announce my new adventure: I've just joined the tech team at BitStream Innovations! 🚀👩‍💻" + "\n" + 
      "Excited to contribute and learn in this dynamic space. Thanks for the support! ",
      author_id: 12
    })

    post13.photo.attach( io: File.open(Rails.root.join("db", "assets", "congrats.gif")),
    filename: "congrats.gif"
    )

    Comment.create!({
      post_id: post13.id,
      commenter_id: user8.id,
      body: "Congratulations on your new adventure! 🌟 BitStream Innovations is lucky to have you on their tech team. Best of luck in your new role!"
    })

    Comment.create!({
      post_id: post13.id,
      commenter_id: user14.id,
      body: "That's fantastic news! 🎉 Your journey with BitStream Innovations is going to be filled with exciting experiences. Enjoy the ride!"
    })

    Comment.create!({
      post_id: post13.id,
      commenter_id: user11.id,
      body: "Such a great move! BitStream Innovations is the place to be for tech enthusiasts. Wishing you a wonderful and fulfilling time there!"
    })

    Comment.create!({
      post_id: post13.id,
      commenter_id: user9.id,
      body: "Wow, congrats on the new role! Your skills and enthusiasm will undoubtedly make a significant impact at BitStream Innovations. Go conquer, tech champion!"
    })

    Comment.create!({
      post_id: post13.id,
      commenter_id: user2.id,
      body: "Your passion for tech will surely shine in this dynamic space. Cheers to your new adventure!"
    })

    post14 = Post.create!({
      body: "I'm excited to announce that I've earned the Innovator's Codebreaker Certification!",
      author_id: 6
    })

    post14.photo.attach( io: File.open(Rails.root.join("db", "assets", "certificate.gif")),
    filename: "certificate.gif"
    )

    Comment.create!({
      post_id: post14.id,
      commenter_id: user1.id,
      body: "Congratulations! 🌟 The Innovator's Codebreaker Certification is a testament to your skills and dedication. Well done!"
    })

    Comment.create!({
      post_id: post14.id,
      commenter_id: user5.id,
      body: "Wow, that's fantastic news! Earning the Innovator's Codebreaker Certification is no small feat. You should be very proud!"
    })

    Comment.create!({
      post_id: post14.id,
      commenter_id: user8.id,
      body: "Incredible achievement! The Innovator's Codebreaker Certification speaks volumes about your expertise. Way to go!"
    })


    post15 = Post.create!({
      body: "Explain Structure of URL",
      author_id: 8
    })

    post15.photo.attach( io: File.open(Rails.root.join("db", "assets", "structure_of_url.jpeg")),
    filename: "structure_of_url.jpeg"
    )

    Comment.create!({
      post_id: post15.id,
      commenter_id: user13.id,
      body: "This is a great way to break down the components of a URL! Very helpful for those learning about web development. Thanks for sharing!"
    })

    Comment.create!({
      post_id: post15.id,
      commenter_id: user9.id,
      body: "Clear and concise explanation with a visual aid! This will be super helpful for beginners. Thanks for sharing!"
    })

    post16 = Post.create!({
      body: "Here's the gameplay for The Adventures of Gary the Snail" + "\n" +
      "Level 4 is quite challenging",
      author_id: 1
    })

    # post13.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/fullStack.jpeg"),
    # filename: "fullStack.jpg"
    # )

    post16.photo.attach( io: File.open(Rails.root.join("db", "assets", "gary.gif")),
    filename: "gary.gif"
    )

    Comment.create!({
      post_id: post16.id,
      commenter_id: user2.id,
      body: "Thanks for sharing this gameplay update! 🎮 Level 4 sounds like it's going to be an exciting challenge. Can't wait to see how it unfolds!"
    })

    Comment.create!({
      post_id: post16.id,
      commenter_id: user5.id,
      body: "Level 3 also seems a little tricky"
    })

    Comment.create!({
      post_id: post16.id,
      commenter_id: user6.id,
      body: "Is this the Gary from Spongebob?"
    })

    Comment.create!({
      post_id: post16.id,
      commenter_id: user9.id,
      body: "Love the background music"
    })

    Comment.create!({
      post_id: post16.id,
      commenter_id: user12.id,
      body: "Omg, I can't even pass level 3"
    })

    Comment.create!({
      post_id: post16.id,
      commenter_id: user6.id,
      body: "Meow"
    })

    Comment.create!({
      post_id: post16.id,
      commenter_id: user10.id,
      body: "Impressive work on developing the game! 🚀 Level 4 is piquing my interest. Keep up the fantastic job!"
    })

    user1.photo.attach( io: File.open(Rails.root.join("db", "assets", "kc.png")),
    filename: "kc.png"
    )

    # user2.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/Squidward.png"),
    # filename: "Squidward.png"
    # )

    user2.photo.attach( io: File.open(Rails.root.join("db", "assets", "Squidward.png")),
    filename: "Squidward.png"
    )

    # user3.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/Yor.webp"),
    # filename: "Yor.jpg"
    # )

    user3.photo.attach( io: File.open(Rails.root.join("db", "assets", "Yor.webp")),
    filename: "Yor.jpg"
    )

    # user4.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/loid.webp"),
    # filename: "Loid.jpg"
    # )

    user4.photo.attach( io: File.open(Rails.root.join("db", "assets", "loid.webp")),
    filename: "Loid.jpg"
    )

    # user5.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/Ted.jpeg"),
    # filename: "Ted.jpg"
    # )

    user5.photo.attach( io: File.open(Rails.root.join("db", "assets", "Ted.jpeg")),
    filename: "Ted.jpg"
    )

    # user6.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/garyicon.png"),
    # filename: "garyIcon.jpg"
    # )

    user6.photo.attach( io: File.open(Rails.root.join("db", "assets", "garyicon.png")),
    filename: "garyIcon.jpg"
    )

    # user7.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/harry.webp"),
    # filename: "harry.jpg"
    # )

    user7.photo.attach( io: File.open(Rails.root.join("db", "assets", "harry.webp")),
    filename: "harry.jpg"
    )

    # user8.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/Naruto.webp"),
    # filename: "naruto.jpg"
    # )

    user8.photo.attach( io: File.open(Rails.root.join("db", "assets", "Naruto.webp")),
    filename: "naruto.jpg"
    )

    # user9.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/gon.jpeg"),
    # filename: "gon.jpg"
    # )

    user9.photo.attach( io: File.open(Rails.root.join("db", "assets", "gon.jpeg")),
    filename: "gon.jpg"
    )

    # user10.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/tony.jpg"),
    # filename: "tony.jpg"
    # )

    user10.photo.attach( io: File.open(Rails.root.join("db", "assets", "tony.jpg")),
    filename: "tony.jpg"
    )

    # user11.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/spongebob.jpeg"),
    # filename: "spongebob.jpg"
    # )

    user11.photo.attach( io: File.open(Rails.root.join("db", "assets", "spongebob.jpeg")),
    filename: "spongebob.jpg"
    )

    # user12.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/peter.webp"),
    # filename: "peter.jpg"
    # )

    user12.photo.attach( io: File.open(Rails.root.join("db", "assets", "peter.webp")),
    filename: "peter.jpg"
    )

    # user13.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/anya.jpeg"),
    # filename: "anya.jpg"
    # )

    user13.photo.attach( io: File.open(Rails.root.join("db", "assets", "anya.jpeg")),
    filename: "anya.jpg"
    )

    # user14.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/gojo.jpeg"),
    # filename: "gojo.jpg"
    # )

    user14.photo.attach( io: File.open(Rails.root.join("db", "assets", "gojo.jpeg")),
    filename: "gojo.jpg"
    )

    # user15.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/Hermione.webp"),
    # filename: "Hermione.jpg"
    # )

    user15.photo.attach( io: File.open(Rails.root.join("db", "assets", "Hermione.webp")),
    filename: "Hermione.jpg"
    )

    # user16.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/Daenerys.webp"),
    # filename: "Daenerys.jpg"
    # )

    user16.photo.attach( io: File.open(Rails.root.join("db", "assets", "Daenerys.webp")),
    filename: "Daenerys.jpg"
    )

    # Post.first.photo.attach( io: URI.open("https://linkedup-seeds.s3.amazonaws.com/cat.jpg"),
    # filename: "cat.jpg"
    # )

    Post.all.each do |post| 
      likes_num = rand(8..20)
      users = User.order("RANDOM()").limit(likes_num)
      users.each do |user|
        Like.create!({
          liker_id: user.id,
          likeable_id: post.id
        })
      end
    end
  
    puts "Done!"
  # end