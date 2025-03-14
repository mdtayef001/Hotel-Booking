import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import jwt from "jsonwebtoken";
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hotelbooking-76ba7.web.app",
      "https://hotelbooking-76ba7.firebaseapp.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.a4nf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // hotelDB.hotelsCollections

    const hotelsCollection = client.db("hotelDB").collection("hotels");
    const bookingCollection = client.db("hotelDB").collection("booking");
    const reviewsCollection = client.db("hotelDB").collection("reviews");

    // verify token
    const verifyToken = async (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorize access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ message: "unauthorize access" });
        req.decoded = decoded;
        next();
      });
    };

    // create the token
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.send(token);
    });

    // rooms
    app.get("/rooms", async (req, res) => {
      const Limit = parseInt(req.query.limit) || 0;
      const id = req.query.id;
      const query = {};
      if (id) {
        query._id = new ObjectId(id);
      }
      const cursor = hotelsCollection.find(query).limit(Limit);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/short", async (req, res) => {
      const low = req.query.low;
      if (!low) {
        const result = await hotelsCollection.find().toArray();
        res.send(result);
      }

      const result = await hotelsCollection
        .find()
        .sort({ pricePerNight: 1 })
        .toArray();
      res.send(result);
    });

    // booking apis
    app.get("/booking/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(401).send({ message: "forbidden access" });
      }

      const query = { email };
      const result = await bookingCollection
        .aggregate([
          { $match: query },
          {
            $addFields: {
              hotelsId: {
                $convert: {
                  input: "$roomId",
                  to: "objectId",
                  onError: null,
                  onNull: null,
                },
              },
            },
          },
          {
            $lookup: {
              from: "hotels",
              localField: "hotelsId",
              foreignField: "_id",
              as: "bookingDetails",
            },
          },
          { $unwind: "$bookingDetails" },
          {
            $project: {
              _id: 1,
              image: "$bookingDetails.image",
              name: "$bookingDetails.name",
              price: "$bookingDetails.pricePerNight",
              datePick: {
                $dateToString: {
                  format: "%Y-%m-%d", // Fixed format
                  date: {
                    $convert: {
                      input: "$datePick",
                      to: "date",
                      onError: new Date("1970-01-01"), // Fallback date
                      onNull: new Date("1970-01-01"),
                    },
                  },
                },
              },
            },
          },
        ])
        .toArray();
      res.send(result);
    });

    app.post("/booking", async (req, res) => {
      const bookingInfo = req.body;
      const result = await bookingCollection.insertOne(bookingInfo);
      res.send(result);
    });

    app.patch("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const updateInfo = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          datePick: updateInfo.date,
        },
      };

      const result = await bookingCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    app.delete("/booking/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    });

    // review api

    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    app.post("/reviews", async (req, res) => {
      const reviewData = req.body;
      const result = await reviewsCollection.insertOne(reviewData);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
