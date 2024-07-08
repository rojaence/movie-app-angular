import { IMediaResponse, IMovie } from "../models/interfaces"
import { MovieResponse } from "../models/movie.model"

export const MOCK_MOVIE_RESPONSE_DATA = {
  "page": 1,
  "results": [
      {
          "adult": false,
          "backdropPath": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
          "genres": [
              878,
              12,
              28
          ],
          "id": 653346,
          "originalLanguage": "en",
          "originalTitle": "Kingdom of the Planet of the Apes",
          "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
          "popularity": 5120.32,
          "posterPath": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
          "releaseDate": "2024-05-08T00:00:00",
          "title": "Kingdom of the Planet of the Apes",
          "voteAverage": 6.884,
          "voteCount": 842,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
          "genres": [
              10752,
              28,
              18
          ],
          "id": 929590,
          "originalLanguage": "en",
          "originalTitle": "Civil War",
          "overview": "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
          "popularity": 2378.848,
          "posterPath": "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
          "releaseDate": "2024-04-10T00:00:00",
          "title": "Civil War",
          "voteAverage": 7.068,
          "voteCount": 1368,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
          "genres": [
              878,
              28,
              12
          ],
          "id": 823464,
          "originalLanguage": "en",
          "originalTitle": "Godzilla x Kong: The New Empire",
          "overview": "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
          "popularity": 2222.6,
          "posterPath": "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
          "releaseDate": "2024-03-27T00:00:00",
          "title": "Godzilla x Kong: The New Empire",
          "voteAverage": 7.225,
          "voteCount": 2580,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg",
          "genres": [
              27,
              53
          ],
          "id": 719221,
          "originalLanguage": "en",
          "originalTitle": "Tarot",
          "overview": "When a group of friends recklessly violate the sacred rule of Tarot readings, they unknowingly unleash an unspeakable evil trapped within the cursed cards. One by one, they come face to face with fate and end up in a race against death.",
          "popularity": 1829.223,
          "posterPath": "/gAEUXC37vl1SnM7PXsHTF23I2vq.jpg",
          "releaseDate": "2024-05-01T00:00:00",
          "title": "Tarot",
          "voteAverage": 6.555,
          "voteCount": 373,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/JtN7Q03S3oq7A4KZ7Z3I7m3osP.jpg",
          "genres": [
              28,
              80,
              53
          ],
          "id": 573435,
          "originalLanguage": "en",
          "originalTitle": "Bad Boys: Ride or Die",
          "overview": "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
          "popularity": 1776.083,
          "posterPath": "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
          "releaseDate": "2024-06-05T00:00:00",
          "title": "Bad Boys: Ride or Die",
          "voteAverage": 7.6,
          "voteCount": 88,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg",
          "genres": [
              878,
              28
          ],
          "id": 614933,
          "originalLanguage": "en",
          "originalTitle": "Atlas",
          "overview": "A brilliant counterterrorism analyst with a deep distrust of AI discovers it might be her only hope when a mission to capture a renegade robot goes awry.",
          "popularity": 1520.349,
          "posterPath": "/bcM2Tl5HlsvPBnL8DKP9Ie6vU4r.jpg",
          "releaseDate": "2024-05-23T00:00:00",
          "title": "Atlas",
          "voteAverage": 6.7,
          "voteCount": 646,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/H5HjE7Xb9N09rbWn1zBfxgI8uz.jpg",
          "genres": [
              28,
              35
          ],
          "id": 746036,
          "originalLanguage": "en",
          "originalTitle": "The Fall Guy",
          "overview": "Fresh off an almost career-ending accident, stuntman Colt Seavers has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job.",
          "popularity": 1274.542,
          "posterPath": "/tSz1qsmSJon0rqjHBxXZmrotuse.jpg",
          "releaseDate": "2024-04-24T00:00:00",
          "title": "The Fall Guy",
          "voteAverage": 7.272,
          "voteCount": 1090,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/uVu2fBc114un7F1GD76RBouWyBP.jpg",
          "genres": [
              16,
              10751,
              18,
              12,
              35
          ],
          "id": 1022789,
          "originalLanguage": "en",
          "originalTitle": "Inside Out 2",
          "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
          "popularity": 1132.657,
          "posterPath": "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
          "releaseDate": "2024-06-12T00:00:00",
          "title": "Inside Out 2",
          "voteAverage": 7.6,
          "voteCount": 11,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/tkHQ7tnYYUEnqlrKuhufIsSVToU.jpg",
          "genres": [
              27
          ],
          "id": 437342,
          "originalLanguage": "en",
          "originalTitle": "The First Omen",
          "overview": "When a young American woman is sent to Rome to begin a life of service to the church, she encounters a darkness that causes her to question her own faith and uncovers a terrifying conspiracy that hopes to bring about the birth of evil incarnate.",
          "popularity": 1038.144,
          "posterPath": "/uGyiewQnDHPuiHN9V4k2t9QBPnh.jpg",
          "releaseDate": "2024-04-03T00:00:00",
          "title": "The First Omen",
          "voteAverage": 6.798,
          "voteCount": 430,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/11G6N5zW0KykVS0EcNKeXHUmQj8.jpg",
          "genres": [
              10752
          ],
          "id": 1136318,
          "originalLanguage": "en",
          "originalTitle": "Battle Over Britain",
          "overview": "A young pilot, fresh out of training, is called to join a Flight while they wait for the call to scramble. Throughout a single day, he witnesses the skies of southern England filled with deadly dog fights, and after every exhausting battle the men return to their dispersal hut, only to find another of their number missing. Unwilling to surrender, the pilot and his comrades unite to take to the skies once more, determined to defend not only the airfield, but their entire country.",
          "popularity": 983.563,
          "posterPath": "/8htJ7keZTwa08aC9OKyiqaq1cNJ.jpg",
          "releaseDate": "2023-12-01T00:00:00",
          "title": "Battle Over Britain",
          "voteAverage": 6.417,
          "voteCount": 12,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
          "genres": [
              16,
              28,
              10751,
              35,
              14
          ],
          "id": 1011985,
          "originalLanguage": "en",
          "originalTitle": "Kung Fu Panda 4",
          "overview": "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
          "popularity": 901.185,
          "posterPath": "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
          "releaseDate": "2024-03-02T00:00:00",
          "title": "Kung Fu Panda 4",
          "voteAverage": 7.126,
          "voteCount": 1916,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/shrwC6U8Bkst9T9J7fr1A50n6x6.jpg",
          "genres": [
              28,
              12,
              878
          ],
          "id": 786892,
          "originalLanguage": "en",
          "originalTitle": "Furiosa: A Mad Max Saga",
          "overview": "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
          "popularity": 895.503,
          "posterPath": "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
          "releaseDate": "2024-05-22T00:00:00",
          "title": "Furiosa: A Mad Max Saga",
          "voteAverage": 7.7,
          "voteCount": 770,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/iafs5DG5fGq7ef0acl3xlX4BFrs.jpg",
          "genres": [
              18,
              10770
          ],
          "id": 1219685,
          "originalLanguage": "fr",
          "originalTitle": "Un père idéal",
          "overview": "",
          "popularity": 871.751,
          "posterPath": "/4xJd3uwtL1vCuZgEfEc8JXI9Uyx.jpg",
          "releaseDate": "2024-04-21T00:00:00",
          "title": "Un père idéal",
          "voteAverage": 5.695,
          "voteCount": 41,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
          "genres": [
              878,
              27,
              28
          ],
          "id": 940721,
          "originalLanguage": "ja",
          "originalTitle": "ゴジラ-1.0",
          "overview": "In postwar Japan, Godzilla brings new devastation to an already scorched landscape. With no military intervention or government help in sight, the survivors must join together in the face of despair and fight back against an unrelenting horror.",
          "popularity": 842.99,
          "posterPath": "/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
          "releaseDate": "2023-11-03T00:00:00",
          "title": "Godzilla Minus One",
          "voteAverage": 7.641,
          "voteCount": 1549,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/1m1rXopfNDVL3UMiv6kriYaJ3yE.jpg",
          "genres": [
              28,
              53,
              80,
              878
          ],
          "id": 882059,
          "originalLanguage": "en",
          "originalTitle": "Boy Kills World",
          "overview": "When his family is murdered, a deaf-mute named Boy escapes to the jungle and is trained by a mysterious shaman to repress his childish imagination and become an instrument of death.",
          "popularity": 777.197,
          "posterPath": "/25JskXmchcYwj3jHRmcPm738MpB.jpg",
          "releaseDate": "2024-04-24T00:00:00",
          "title": "Boy Kills World",
          "voteAverage": 6.9,
          "voteCount": 254,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
          "genres": [
              878,
              12
          ],
          "id": 693134,
          "originalLanguage": "en",
          "originalTitle": "Dune: Part Two",
          "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
          "popularity": 750.618,
          "posterPath": "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
          "releaseDate": "2024-02-27T00:00:00",
          "title": "Dune: Part Two",
          "voteAverage": 8.169,
          "voteCount": 4390,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/b93N6Mb08NhFhobB8KrR5GBaPP5.jpg",
          "genres": [
              878,
              27
          ],
          "id": 969686,
          "originalLanguage": "en",
          "originalTitle": "4 Horsemen: Apocalypse",
          "overview": "A small team of scientists must race against time to stop what seems to be a cascade of global disasters signaling the possible apocalypse and end of days.",
          "popularity": 744.357,
          "posterPath": "/dt3mo4tArf2llDiht91cnvUtSgT.jpg",
          "releaseDate": "2022-04-29T00:00:00",
          "title": "4 Horsemen: Apocalypse",
          "voteAverage": 5.656,
          "voteCount": 77,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/s9hW1DHfgy5ppK1fTUJuMKh4YFK.jpg",
          "genres": [
              28,
              53
          ],
          "id": 980083,
          "originalLanguage": "en",
          "originalTitle": "Top Gunner: Danger Zone",
          "overview": "An airliner filled with 800 passengers is forced to fly fast and low, above farmlands, suburbs and skyscraper-packed cities or the tons of explosives aboard will detonate. When an elite unit of US Air Force fighter jets is sent to provide escort, they find themselves facing a squadron of unidentifiable warplanes which ignites a deadly air battle that threatens to destroy all life above and below.",
          "popularity": 729.196,
          "posterPath": "/29UCk1nvPzn2XubLk5rKDMlHBRu.jpg",
          "releaseDate": "2022-05-20T00:00:00",
          "title": "Top Gunner: Danger Zone",
          "voteAverage": 4,
          "voteCount": 13,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/vWzJDjLPmycnQ42IppEjMpIhrhc.jpg",
          "genres": [
              16,
              35,
              10751,
              12
          ],
          "id": 748783,
          "originalLanguage": "en",
          "originalTitle": "The Garfield Movie",
          "overview": "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
          "popularity": 698.228,
          "posterPath": "/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
          "releaseDate": "2024-04-30T00:00:00",
          "title": "The Garfield Movie",
          "voteAverage": 6.425,
          "voteCount": 153,
          "video": false,
          "mediaType": 0
      },
      {
          "adult": false,
          "backdropPath": "/vblTCXOWUQGSc837vgbhDRi4HSc.jpg",
          "genres": [
              28,
              80,
              35,
              53
          ],
          "id": 955555,
          "originalLanguage": "ko",
          "originalTitle": "범죄도시3",
          "overview": "Detective Ma Seok-do changes his affiliation from the Geumcheon Police Station to the Metropolitan Investigation Team, in order to eradicate Japanese gangsters who enter Korea to commit heinous crimes.",
          "popularity": 626.951,
          "posterPath": "/lW6IHrtaATxDKYVYoQGU5sh0OVm.jpg",
          "releaseDate": "2023-05-31T00:00:00",
          "title": "The Roundup: No Way Out",
          "voteAverage": 7.082,
          "voteCount": 208,
          "video": false,
          "mediaType": 0
      }
  ],
  "totalPages": 44585,
  "totalResults": 891696
}

export const MOCK_MOVIE_RESPONSE = new MovieResponse(MOCK_MOVIE_RESPONSE_DATA)
