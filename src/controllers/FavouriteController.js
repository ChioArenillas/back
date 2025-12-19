const Favourite = require('../models/Favourite')

// GET all favourites
const getFavourites = async (req, res) => {
  try {
    await Favourite.deleteMany({ donutId: null });
    const favourites = await Favourite.find({ donutId: { $ne: null } }).populate('donutId');
    res.status(200).json({
      status: 'succeeded',
      data: favourites,
      error: null
    });
  } catch (error) {
    res.status(500).json({ status: 'failed', data: null, error: error.message });
  }
}


// GET if donut is favourite
const isFavourite = async (req, res) => {
  try {
    const { donutId } = req.params
    const fav = await Favourite.findOne({ donutId })
    res.status(200).json({
      status: 'succeeded',
      data: !!fav,
      error: null
    })
  } catch (error) {
    res.status(500).json({ status: 'failed', data: null, error: error.message })
  }
}

// ADD favourite
const addFavourite = async (req, res) => {
  try {
    const { donutId } = req.body;
    const fav = new Favourite({ donutId });
    await fav.save();
    res.status(201).json({ status: 'succeeded', data: fav, error: null });
  } catch (error) {
    res.status(500).json({ status: 'failed', data: null, error: error.message });
  }
}

// DELETE favourite
const deleteFavourite = async (req, res) => {
  try {
    const { donutId } = req.params
    const deleted = await Favourite.findOneAndDelete({ donutId: donutId });

    if (!deleted) {
      return res.status(404).json({ status: 'failed', data: null, error: 'Favourite not found' });
    }

    res.status(200).json({
      status: 'succeeded',
      data: deleted,
      error: null
    });
  } catch (error) {
    res.status(500).json({ status: 'failed', data: null, error: error.message });
  }
};
module.exports = {
  getFavourites,
  isFavourite,
  addFavourite,
  deleteFavourite
}
