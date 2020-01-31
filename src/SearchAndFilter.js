class SearchAndFilter {
  searchAndFilter(logic, chipList, courses, search, subject, minimumCredits, maximumCredits) {
    
    console.log(courses);
  //  console.log(chipList.length);
    if(chipList.length != 0) {
      
      console.log(logic);
      let coursesAfterSearch = [];

      //OR situation, OR is showing to user
      if(logic === 'OR')
      {
    //    console.log("weor");
      coursesAfterSearch = [];
      // console.log(search);
      // console.log(chipList);
      // console.log(chipList.length);
      for(let i = 0; i < chipList.length; i ++)
      {
    //    console.log(chipList[i]);
        for(const course of Object.values(courses)) 
        {
            if(course.keywords.includes(chipList[i])) 
            {
    //          console.log(course);
              coursesAfterSearch.push(course);
            }
         
        }
    //  console.log(courses);
      }
      courses = coursesAfterSearch;
      }

      //AND situation, AND is showing to user
      if(logic === 'AND')
      {
      //  console.log("weand");
      coursesAfterSearch = [];
      // console.log(search);
 
      // console.log(chipList);
      // console.log(chipList.length);
     
      
      for(const course of Object.values(courses)) 
      {
        let keyMatch = false;
        for(let i = 0; i < chipList.length; i ++)
        {
      //    console.log(chipList[i]);
            if(course.keywords.includes(chipList[i])) 
            {
              keyMatch = true;
            }
            else
            {
              keyMatch = false;
              break;
            } 
     //     console.log(keyMatch);
        }
        if(keyMatch == true)
        {
         // console.log(course);
          coursesAfterSearch.push(course);
        }
     // console.log(courses);
      }
      courses = coursesAfterSearch;
      }
    }

    if(subject !== 'All') {
      let coursesAfterSubject = [];

      for(const course of Object.values(courses)) {
        if(course.subject === subject)
          coursesAfterSubject.push(course)
      }
      courses = coursesAfterSubject;
    }

    if(minimumCredits !== '') {
      let coursesAfterMinimumCredits = [];

      for(const course of Object.values(courses)) {
        if(course.credits >= parseInt(minimumCredits))
          coursesAfterMinimumCredits.push(course);
      }
      courses = coursesAfterMinimumCredits;
    }

    if(maximumCredits !== '') {
      let coursesAfterMaximumCredits = [];

      for(const course of Object.values(courses)) {
        if(course.credits <= parseInt(maximumCredits))
          coursesAfterMaximumCredits.push(course);
      }
      courses = coursesAfterMaximumCredits;
    }

    return courses;
  }
}

export default SearchAndFilter;
