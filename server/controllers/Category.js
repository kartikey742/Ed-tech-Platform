const Category= require('../models/Category');
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
const createCategory=async (req, res) => {
    try{
        const {name ,description} = req.body;
        if(!name || !description) {
            return res.status(400).json({ error: 'Name and description are required' });
        }
        const CategoryDetails = await Category.create({ name, description });
        return res.status(201).json({ message: 'Category created successfully', category: CategoryDetails,Success: true });
    }
    catch (error) {
        console.error('Error creating category:', error);
        return res.status(500).json({ error: 'Error creating category' });
    }
}
const showAllCategories= async (req, res) => {
  
  try {
    const categories = await Category.find();
        return res.status(200).json({ Success: true ,message: 'Categories fetched successfully',data:categories});
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ error: 'Error fetching categories' });
    }
}

const categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec()

  
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
   let differentCategory
    if(categoriesExceptSelected.length>0){

       differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
      )
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
    path: "ratingAndReviews"
  }
      })
      .exec()
    }

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
    path: "ratingAndReviews"
  }
      })
      .exec()
    const allCourses = allCategories.flatMap((category) => category.courses)
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}   
module.exports = {createCategory,showAllCategories,categoryPageDetails};