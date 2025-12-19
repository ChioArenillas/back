const donutsDB = require("../mocks/donutsDB")
const donutModel = require("../models/Donut")

//GET ALL DONUTS

const getDonuts = async (req, res) => {
    try {

        const allDonuts = await donutModel.find()
        const resDonut = allDonuts.map(donut => {
            return {
                id: donut.id,
                name: donut.name
            }
        })
        res.status(200).json({
            status: 'succeeded',
            data: resDonut,
            error: null
        })

    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
}

//GET DONUT BY ID
const getDonutById = async (req, res) => {
    try {
        const id = req.params.id
        const donut = await donutModel.findById(id)
        console.log(donut)
        res.status(200).json({
            status: 'succeeded',
            data: donut,
            error: null
        })

    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
}

const createDonut = async (req, res) => {
    try {
        const donutData = req.body
        const newDonut = await donutModel({
            name: donutData.name,
            flavor: donutData.flavor,
            price: donutData.price
        })
        await newDonut.save()
        console.log(newDonut)
        res.status(200).json({
            status: 'succeeded',
            data: newDonut,
            error: null
        })

    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
}


const updateDonut = async (req, res) => {
    try {
        const id = req.params.id
        const { name, flavor, price } = req.body

        const donutAux = await donutModel.findById(id)

        if (!donutAux) return res.status(404).send('El donut no existe')

        if (name) {
            donutAux.name = name
        }
        if (flavor) {
            donutAux.flavor = flavor
        }
        if (price) {
            donutAux.price = price
        }

        await donutAux.save()

        res.status(200).json({
            status: 'succeeded',
            data: null,
            error: null
        })

    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
}

const deleteDonut = async (req, res) => {
  try {
    const id = req.params.id;

    // Borrar el donut
    const deletedDonut = await donutModel.findByIdAndDelete(id);

    if (!deletedDonut) {
      return res.status(404).json({ status: 'failed', data: null, error: 'Donut not found' });
    }

    // Borrar todos los favoritos asociados a este donut
    await Favourite.deleteMany({ donutId: id });

    res.status(200).json({
      status: 'succeeded',
      data: null,
      error: null
    });
  } catch (error) {
    res.status(500).json({ status: 'failed', data: null, error: error.message });
  }
};


//Load initial data
const loadData = async (req, res) => {
    try {
        donutsDB.map(async (donut) => {
            const newDonut = donutModel({
                name: donut.name,
                flavor: donut.flavor,
                price: donut.price
            })
            await newDonut.save()
        })
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getDonuts,
    getDonutById,
    createDonut,
    updateDonut,
    deleteDonut,
    loadData,
}




//PRIMERA CARGA DE DATOS HAY QUE HACERLA CON ESTO:
/* const { find, newDonutModel } = require("../mocks/donutsMethodMongoDB")

const getDonuts =  (req, res) => {
    try{

        const allDonuts = find()
        console.log(allDonuts)
        res.status(200).json({
            donuts: allDonuts,
        })

    }catch(error){
        res
        .status(500)
    }}

const loadData = async (req, res) => { 
    try{
        donutsDB.map(async donut => {
            const newDonut = donutModel({
                name: donut.name,
                flavor: donut.flavor,
                price: donut.price
            })
            await newDonut.save()
        })
        res.sendStatus(200)
    } catch(error){
        console.log(error)
    }
}

module.exports = {
    getDonuts,
    loadData,
}
 */