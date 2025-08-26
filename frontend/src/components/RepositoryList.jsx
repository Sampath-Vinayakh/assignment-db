export default function RepositoryList({repoList}) {

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {repoList.map((d) => (
          <div
            key={d._id}
            className="max-w-md bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex  items-center gap-4"
          >
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={d.owner.avatar_url}
              alt="Profile"
            />

       
            <div className="flex-1">
              <h5 className="text-lg font-semibold text-gray-900">
                {d.owner.login}
              </h5>
              <h3 className="text-sm text-gray-800">
                {d.full_name}
              </h3>
              <div className="flex items-center mb-1 text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.04 9.397c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.97z" />
                </svg>
                <span>{d.stars}</span>
              </div>

              <p className="text-sm text-gray-600">{d.description}</p>



              <a
                href={d.html_url}
                target="_blank"
                className="inline-flex items-center text-sm font-medium mt-2 text-blue-600 hover:underline"
              >
                Link
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
